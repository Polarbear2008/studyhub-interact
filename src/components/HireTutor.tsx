import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { SearchFilters } from "./hire-tutor/SearchFilters";
import { TutorCard } from "./hire-tutor/TutorCard";

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
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        subjects={subjects}
        levels={levels}
      />

      {/* Tutor Cards Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTutors.map((tutor, index) => (
            <TutorCard key={index} tutor={tutor} />
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