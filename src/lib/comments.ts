import { supabase } from "@/integrations/supabase/client";

export const fetchResourceComments = async (resourceId: string) => {
  const { data, error } = await supabase
    .from('resource_comments')
    .select(`
      id,
      content,
      created_at,
      user_id,
      profiles!resource_comments_user_id_fkey (
        first_name,
        last_name
      )
    `)
    .eq('resource_id', resourceId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};