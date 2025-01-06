import { GraduationCap, BookOpen, Calculator } from "lucide-react";
import { HeroSection } from "./subjects/HeroSection";
import { SubjectCard } from "./subjects/SubjectCard";
import { ResourcesList } from "./subjects/ResourcesList";

export const SubjectsPage = () => {
  const subjectGroups = {
    "A Level": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "Economics",
      "Business Studies",
      "History",
      "Geography"
    ],
    "AS Level": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "Economics",
      "Business Studies"
    ],
    "IGCSE": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "Economics",
      "Business Studies",
      "History",
      "Geography"
    ]
  };

  const getIcon = (group: string) => {
    switch(group) {
      case "A Level":
        return GraduationCap;
      case "AS Level":
        return BookOpen;
      case "IGCSE":
        return Calculator;
      default:
        return GraduationCap;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(subjectGroups).map(([group, subjects]) => (
            <SubjectCard
              key={group}
              group={group}
              subjects={subjects}
              icon={getIcon(group)}
            />
          ))}
        </div>

        <ResourcesList />
      </div>
    </div>
  );
};