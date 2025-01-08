import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Award,
  BookOpen,
  Calendar as CalendarIcon,
  GraduationCap,
  Star,
  Timer,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="pb-0">
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-0 right-0 bg-primary text-white p-1 rounded-full">
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
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= tutor.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {tutor.rating} ({tutor.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-gray-600 mb-4">{tutor.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <div className="font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Subjects
              </div>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Levels
              </div>
              <div className="flex flex-wrap gap-2">
                {tutor.levels.map((level, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold text-primary flex items-center gap-2">
              <Timer className="w-5 h-5" />
              {tutor.hourlyRate}/hour
            </div>
          </div>

          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">View Full Profile</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tutor Profile</DialogTitle>
                  <DialogDescription>
                    Detailed information about {tutor.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold">{tutor.name}</h3>
                      <p className="text-gray-600">{tutor.qualifications}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">About Me</h4>
                    <p className="text-gray-600">{tutor.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Teaching Experience</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          <li>Over 5 years of teaching experience</li>
                          <li>Specialized in exam preparation</li>
                          <li>Personalized learning approach</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Teaching Style</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          <li>Interactive learning sessions</li>
                          <li>Regular progress assessments</li>
                          <li>Exam-focused strategies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Book Trial Lesson
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book a Trial Lesson</DialogTitle>
                  <DialogDescription>
                    Choose a date for your trial lesson with {tutor.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Select Date</label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Trial Lesson Details</label>
                    <div className="bg-gray-50 p-4 rounded-md space-y-2">
                      <p className="text-sm text-gray-600">
                        • 30-minute trial lesson
                      </p>
                      <p className="text-sm text-gray-600">
                        • Get to know your tutor
                      </p>
                      <p className="text-sm text-gray-600">
                        • Discuss learning goals
                      </p>
                      <p className="text-sm font-medium text-primary">
                        Special trial price: £15
                      </p>
                    </div>
                  </div>
                  <Button className="w-full" disabled={!date}>
                    Confirm Booking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};