import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    // Base URL for gceguide.com
    const baseUrl = `https://papers.gceguide.com/${level}/${subject}`

    // Fetch the HTML content
    const response = await fetch(baseUrl)
    const html = await response.text()

    // Parse links and metadata
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const links = Array.from(doc.querySelectorAll('a'))

    const papers = []
    const pattern = /(\d{4})_([a-z]+)_(\d+)/i

    for (const link of links) {
      const href = link.getAttribute('href')
      if (!href || !href.endsWith('.pdf')) continue

      const match = href.match(pattern)
      if (!match) continue

      const [_, year, season, paperNumber] = match
      const title = `${subject} ${level} ${examBoard} ${year} ${season} Paper ${paperNumber}`

      // Download the PDF
      const pdfResponse = await fetch(`${baseUrl}/${href}`)
      const pdfBlob = await pdfResponse.blob()

      // Upload to Supabase Storage
      const filePath = `${level}/${subject}/${examBoard}/${year}/${season}/paper${paperNumber}.pdf`
      
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
        .select()

      if (dbError) {
        console.error('Database error:', dbError)
        continue
      }

      papers.push({
        title,
        filePath
      })
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