import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const features = [
    {
      icon: Book,
      title: "Rich Learning Resources",
      description: "Access comprehensive study materials and revision notes",
    },
    {
      icon: Users,
      title: "Expert Teachers",
      description: "Learn from experienced educators in every subject",
    },
    {
      icon: GraduationCap,
      title: "Interactive Quizzes",
      description: "Test your knowledge with engaging assessments",
    },
  ];

  const subjects = [
    {
      title: "Mathematics",
      description: "Algebra, Geometry, Calculus and more",
      color: "bg-blue-100",
    },
    {
      title: "Science",
      description: "Physics, Chemistry, Biology",
      color: "bg-green-100",
    },
    {
      title: "English",
      description: "Literature, Grammar, Writing",
      color: "bg-yellow-100",
    },
    {
      title: "History",
      description: "World History, Civilizations",
      color: "bg-red-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to{" "}
              <span className="text-primary">Your Learning Journey</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover a world of knowledge with our comprehensive educational
              resources.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Subjects
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <Link
              key={subject.title}
              to={`/subjects/${subject.title.toLowerCase()}`}
            >
              <Card
                className={`${subject.color} hover:shadow-lg transition-all transform hover:-translate-y-1`}
              >
                <CardHeader>
                  <CardTitle>{subject.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{subject.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};