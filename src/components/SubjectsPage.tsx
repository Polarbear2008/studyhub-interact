import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Calculator } from "lucide-react";

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
        return <GraduationCap className="w-8 h-8 text-primary" />;
      case "AS Level":
        return <BookOpen className="w-8 h-8 text-secondary" />;
      case "IGCSE":
        return <Calculator className="w-8 h-8 text-accent" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our Subjects
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Comprehensive courses designed to help you excel in your studies
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(subjectGroups).map(([group, subjects]) => (
            <Card 
              key={group} 
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/50 backdrop-blur-sm border border-gray-100"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {getIcon(group)}
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
          ))}
        </div>
      </div>
    </div>
  );
};