import { UserRound, Settings } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileBadgeProps {
  email: string;
  role?: string;
  avatarUrl?: string;
}

export const ProfileBadge = ({ email, role = "student", avatarUrl }: ProfileBadgeProps) => {
  const navigate = useNavigate();
  const initials = email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={initials} />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-12 w-12">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={initials} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{email}</h4>
            <p className="text-sm text-muted-foreground capitalize">
              Role: {role}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate('/profile/edit')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};