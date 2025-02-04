import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CommentForm } from "./comments/CommentForm";
import { CommentList } from "./comments/CommentList";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
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
          user_id
        `)
        .eq('resource_id', resourceId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setComments(data);
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