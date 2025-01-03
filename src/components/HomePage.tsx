import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, GraduationCap, Users, Brain, Calculator, Microscope } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: "Personalized Learning",
      description: "Tailored study plans and resources for your unique learning style",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Users,
      title: "Expert Teachers",
      description: "Learn from experienced educators passionate about your success",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calculator,
      title: "Interactive Practice",
      description: "Engage with dynamic exercises and real-time feedback",
      gradient: "from-orange-500 to-pink-500",
    },
  ];

  const subjects = [
    {
      title: "Mathematics",
      description: "From algebra to calculus, master core mathematical concepts",
      icon: Calculator,
      gradient: "from-blue-500 via-blue-400 to-blue-300",
    },
    {
      title: "Physics",
      description: "Explore the fundamental laws that govern our universe",
      icon: Microscope,
      gradient: "from-purple-500 via-purple-400 to-purple-300",
    },
    {
      title: "Chemistry",
      description: "Discover the science of matter and its transformations",
      icon: Book,
      gradient: "from-green-500 via-green-400 to-green-300",
    },
    {
      title: "Biology",
      description: "Understand life processes and living organisms",
      icon: Brain,
      gradient: "from-red-500 via-red-400 to-red-300",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Transform Your Learning Journey
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
              Access comprehensive study materials, expert tutoring, and interactive
              practice resources to excel in your academic journey.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/subjects"
                className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-primary shadow-sm hover:bg-white/90 transition-all"
              >
                Explore Subjects
              </Link>
              <Link
                to="/hire-tutor"
                className="rounded-md bg-primary/10 px-6 py-3 text-lg font-semibold text-white border-2 border-white/20 hover:bg-primary/20 transition-all"
              >
                Find a Tutor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className={`bg-gradient-to-r ${feature.gradient}`}>
                <feature.icon className="h-8 w-8 text-white" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="bg-gray-50 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Subjects
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => (
              <Link
                key={subject.title}
                to={`/subjects/${subject.title.toLowerCase()}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-xl">
                  <CardHeader className={`bg-gradient-to-br ${subject.gradient} group-hover:scale-[1.02] transition-transform`}>
                    <subject.icon className="h-8 w-8 text-white" />
                    <CardTitle className="text-white">{subject.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600">{subject.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of students achieving their academic goals
            </p>
            <Link
              to="/student-signup"
              className="inline-block rounded-md bg-white px-8 py-3 text-lg font-semibold text-primary shadow-sm hover:bg-white/90 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};