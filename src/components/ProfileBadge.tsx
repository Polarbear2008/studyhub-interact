import { UserRound } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileBadgeProps {
  email: string;
  role?: string;
}

export const ProfileBadge = ({ email, role = "student" }: ProfileBadgeProps) => {
  const initials = email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{email}</h4>
            <p className="text-sm text-muted-foreground capitalize">
              Role: {role}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};