import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CommentFormProps {
  resourceId: string;
  onCommentAdded: () => void;
}

export const CommentForm = ({ resourceId, onCommentAdded }: CommentFormProps) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to comment",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('resource_comments')
        .insert({
          content: newComment.trim(),
          resource_id: resourceId,
          user_id: session.user.id
        });

      if (error) throw error;

      setNewComment("");
      onCommentAdded();
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
};