import { SearchFilters } from "./hire-tutor/SearchFilters";
import { TutorCard } from "./hire-tutor/TutorCard";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const HireTutor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
    "Economics",
    "Business Studies",
  ];

  const levels = ["IGCSE", "AS Level", "A Level"];

  const featuredTutors = [
    {
      name: "Dr. Sarah Johnson",
      image: "/placeholder.svg",
      qualifications: "PhD in Mathematics, Cambridge University",
      subjects: ["Mathematics", "Physics"],
      levels: ["A Level", "AS Level"],
      rating: 4.9,
      reviews: 127,
      description: "Experienced tutor specializing in A-Level Mathematics and Physics with over 10 years of teaching experience.",
      hourlyRate: "$50",
    },
    {
      name: "Prof. Michael Chen",
      image: "/placeholder.svg",
      qualifications: "MSc in Chemistry, Oxford University",
      subjects: ["Chemistry", "Biology"],
      levels: ["IGCSE", "AS Level"],
      rating: 4.8,
      reviews: 93,
      description: "Dedicated science tutor with a passion for making complex concepts easy to understand.",
      hourlyRate: "$45",
    },
    {
      name: "Ms. Emily Davis",
      image: "/placeholder.svg",
      qualifications: "BSc in Computer Science, Stanford University",
      subjects: ["Computer Science", "Mathematics"],
      levels: ["A Level", "AS Level"],
      rating: 4.7,
      reviews: 85,
      description: "Passionate about teaching programming and mathematics with a hands-on approach.",
      hourlyRate: "$55",
    },
    {
      name: "Mr. John Smith",
      image: "/placeholder.svg",
      qualifications: "MSc in Biology, Harvard University",
      subjects: ["Biology", "Chemistry"],
      levels: ["IGCSE", "AS Level"],
      rating: 4.6,
      reviews: 70,
      description: "Experienced tutor with a focus on making biology engaging and accessible.",
      hourlyRate: "$50",
    },
    {
      name: "Dr. Amanda Thompson",
      image: "/placeholder.svg",
      qualifications: "PhD in Economics, London School of Economics",
      subjects: ["Economics", "Business Studies"],
      levels: ["A Level", "AS Level", "IGCSE"],
      rating: 4.9,
      reviews: 112,
      description: "Expert in economics and business studies with a track record of helping students achieve top grades.",
      hourlyRate: "$60",
    }
  ];

  const filteredTutors = featuredTutors.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || tutor.subjects.includes(selectedSubject);
    const matchesLevel = !selectedLevel || tutor.levels.includes(selectedLevel);
    return matchesSearch && matchesSubject && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Tutor
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Connect with experienced tutors who can help you excel in your studies
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Tutors</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="new">New Tutors</TabsTrigger>
          </TabsList>

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

          <Separator className="my-8" />

          <TabsContent value="all" className="space-y-8">
            {filteredTutors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tutors found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutors.map((tutor, index) => (
                  <TutorCard key={index} tutor={tutor} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTutors
                .filter(tutor => tutor.rating >= 4.8)
                .map((tutor, index) => (
                  <TutorCard key={index} tutor={tutor} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTutors
                .slice(0, 3)
                .map((tutor, index) => (
                  <TutorCard key={index} tutor={tutor} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
