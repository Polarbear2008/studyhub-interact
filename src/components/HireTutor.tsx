import { SearchFilters } from "./hire-tutor/SearchFilters";
import { TutorCard } from "./hire-tutor/TutorCard";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Tutor {
  id: string;
  name: string;
  image: string;
  qualifications: string;
  subjects: string[];
  levels: string[];
  rating: number;
  reviews: number;
  description: string;
  hourly_rate: number;
}

export const HireTutor = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const { data, error } = await supabase
        .from('approved_tutors')
        .select('*');

      if (error) {
        throw error;
      }

      setTutors(data || []);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      toast({
        title: "Error",
        description: "Failed to load tutors. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTutors = tutors.filter((tutor) => {
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
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading tutors...</p>
              </div>
            ) : filteredTutors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tutors found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutors.map((tutor) => (
                  <TutorCard 
                    key={tutor.id} 
                    tutor={{
                      ...tutor,
                      hourlyRate: `$${tutor.hourly_rate}`
                    }} 
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors
                .filter(tutor => tutor.rating >= 4.8)
                .map((tutor) => (
                  <TutorCard 
                    key={tutor.id} 
                    tutor={{
                      ...tutor,
                      hourlyRate: `$${tutor.hourly_rate}`
                    }} 
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors
                .slice(0, 3)
                .map((tutor) => (
                  <TutorCard 
                    key={tutor.id} 
                    tutor={{
                      ...tutor,
                      hourlyRate: `$${tutor.hourly_rate}`
                    }} 
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};