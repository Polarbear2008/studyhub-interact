import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Star, UserRound } from "lucide-react";

interface TutorCardProps {
  tutor: {
    name: string;
    image: string;
    qualifications: string;
    subjects: string[];
    levels: string[];
    rating: number;
    reviews: number;
    description: string;
    hourlyRate: string;
  };
}

export const TutorCard = ({ tutor }: TutorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-0">
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full">
              <UserRound className="w-4 h-4" />
            </div>
          </div>
          <div>
            <CardTitle className="text-xl mb-2">{tutor.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>{tutor.qualifications}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {tutor.rating} ({tutor.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{tutor.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tutor.subjects.map((subject, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {subject}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tutor.levels.map((level, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {level}
            </span>
          ))}
        </div>
        <div className="text-xl font-bold text-primary mb-4">
          {tutor.hourlyRate}/hour
        </div>
        <div className="flex gap-4">
          <Button className="w-full">
            View Profile
          </Button>
          <Button variant="outline" className="w-full">
            Book Trial Lesson
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};