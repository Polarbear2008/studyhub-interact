import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { subject, level, examBoard } = await req.json()
    console.log(`Scraping papers for ${subject} ${level} ${examBoard}`)

    // Construct base URL based on parameters
    const baseUrl = `https://pastpapers.papacambridge.com/${encodeURIComponent(level)}/${encodeURIComponent(examBoard)}/${encodeURIComponent(subject)}`
    console.log('Scraping URL:', baseUrl)

    // Fetch the HTML content
    const response = await fetch(baseUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`)
    }

    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    if (!doc) {
      throw new Error('Failed to parse HTML')
    }

    // Find all PDF links
    const links = Array.from(doc.querySelectorAll('a'))
    const papers = []

    for (const link of links) {
      const href = link.getAttribute('href')
      if (!href || !href.endsWith('.pdf')) continue

      // Extract paper details from filename
      // Example filename patterns:
      // 9709_s18_qp_12.pdf (AS/A Level)
      // 0580_w19_qp_42.pdf (IGCSE)
      const match = href.match(/(\d{4})_([a-z]+)_qp_(\d+)/i)
      if (!match) continue

      const [_, year, season, paperNumber] = match
      const title = `${subject} ${level} ${examBoard} ${year} ${season} Paper ${paperNumber}`

      try {
        // Download PDF
        console.log(`Downloading ${title}...`)
        const pdfResponse = await fetch(`${baseUrl}/${href}`)
        if (!pdfResponse.ok) {
          console.error(`Failed to download ${title}: ${pdfResponse.statusText}`)
          continue
        }
        
        const pdfBlob = await pdfResponse.blob()
        const filePath = `${level}/${subject}/${examBoard}/${year}/${season}/paper${paperNumber}.pdf`

        // Upload to Supabase Storage
        console.log(`Uploading ${title} to storage...`)
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('educational_resources')
          .upload(filePath, pdfBlob, {
            contentType: 'application/pdf',
            upsert: true
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          continue
        }

        // Insert metadata into database
        console.log(`Saving ${title} to database...`)
        const { error: dbError } = await supabase
          .from('past_papers')
          .insert({
            title,
            subject,
            level,
            exam_board: examBoard,
            year: parseInt(year),
            season: season.toLowerCase(),
            paper_number: parseInt(paperNumber),
            file_path: filePath
          })

        if (dbError) {
          console.error('Database error:', dbError)
          continue
        }

        papers.push({
          title,
          filePath
        })
        
        console.log(`Successfully processed ${title}`)
      } catch (error) {
        console.error('Error processing paper:', error)
        continue
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Papers scraped and stored successfully', 
        count: papers.length,
        papers 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    )
  }
})