import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CommentForm } from "./comments/CommentForm";
import { CommentList } from "./comments/CommentList";
import { fetchResourceComments } from "@/lib/comments";

interface Profile {
  first_name: string | null;
  last_name: string | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profile: Profile;
}

interface ResourceCommentsProps {
  resourceId: string;
}

export const ResourceComments = ({ resourceId }: ResourceCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
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

      if (data) {
        const formattedComments = data.map(comment => ({
          ...comment,
          profile: {
            first_name: comment.profiles?.first_name || null,
            last_name: comment.profiles?.last_name || null
          }
        }));

        setComments(formattedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  return (
    <div className="space-y-6">
      <CommentForm resourceId={resourceId} onCommentAdded={fetchComments} />
      <CommentList comments={comments} />
    </div>
  );
};