import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

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

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm">
          <Avatar>
            <AvatarFallback>
              {comment.profile?.first_name?.[0] || 'U'}
              {comment.profile?.last_name?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">
                {comment.profile?.first_name
                  ? `${comment.profile.first_name} ${comment.profile.last_name || ''}`
                  : 'Anonymous User'}
              </h4>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="mt-1 text-gray-700">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};