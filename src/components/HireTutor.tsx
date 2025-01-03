import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Search, Star, UserRound, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const HireTutor = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = [
    "All Subjects",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science"
  ];

  const levels = [
    "All Levels",
    "A Level",
    "AS Level",
    "IGCSE",
    "O Level"
  ];

  const featuredTutors = [
    {
      name: "Dr. Sarah Mitchell",
      image: "/lovable-uploads/6fad200d-56d6-4627-a36f-7a9bcc3fc156.png",
      qualifications: "PhD in Physics | Cambridge University",
      subjects: ["Physics", "Mathematics", "Chemistry"],
      levels: ["A Level", "AS Level"],
      rating: 4.9,
      reviews: 127,
      description: "Experienced tutor specializing in A-Level Physics and Mathematics. Passionate about making complex concepts accessible to all students.",
      hourlyRate: "$50"
    },
    {
      name: "Prof. James Wilson",
      image: "/lovable-uploads/6fad200d-56d6-4627-a36f-7a9bcc3fc156.png",
      qualifications: "MSc in Computer Science | Oxford University",
      subjects: ["Computer Science", "Mathematics"],
      levels: ["IGCSE", "A Level"],
      rating: 4.8,
      reviews: 98,
      description: "Expert in Computer Science and Mathematics with 10+ years of teaching experience. Specializes in programming and algorithm design.",
      hourlyRate: "$45"
    }
  ];

  const filteredTutors = featuredTutors.filter(tutor => {
    const matchesSubject = selectedSubject === "all" || tutor.subjects.includes(selectedSubject);
    const matchesLevel = selectedLevel === "all" || tutor.levels.includes(selectedLevel);
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Tutor
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Connect with experienced tutors who can help you excel in your studies.
          Personalized learning at your fingertips.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              4.9/5 based on 500+ reviews
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutors..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject.toLowerCase()}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tutor Cards Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTutors.map((tutor, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
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
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Teaching?
        </h2>
        <p className="text-gray-600 mb-8">
          Join our community of professional tutors and help students achieve their academic goals.
        </p>
        <Link to="/teacher-signup">
          <Button size="lg" className="px-8">
            Become a Tutor
          </Button>
        </Link>
      </div>
    </div>
  );
};