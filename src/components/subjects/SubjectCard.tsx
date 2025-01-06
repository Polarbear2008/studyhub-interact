import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  group: string;
  subjects: string[];
  icon: LucideIcon;
}

export const SubjectCard = ({ group, subjects, icon: Icon }: SubjectCardProps) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/50 backdrop-blur-sm border border-gray-100">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Icon className="w-8 h-8 text-primary" />
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {group}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {subjects.map((subject) => (
            <li
              key={subject}
              className="p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer flex items-center group"
            >
              <span className="text-gray-700 group-hover:text-primary transition-colors">
                {subject}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};