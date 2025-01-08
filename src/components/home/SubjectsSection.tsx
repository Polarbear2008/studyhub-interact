import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Book, Brain, Calculator, Microscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const subjects = [
  {
    title: "Mathematics",
    description: "From algebra to calculus, master core mathematical concepts",
    icon: Calculator,
    gradient: "from-blue-500 via-blue-400 to-blue-300",
    path: "/subjects/mathematics"
  },
  {
    title: "Physics",
    description: "Explore the fundamental laws that govern our universe",
    icon: Microscope,
    gradient: "from-purple-500 via-purple-400 to-purple-300",
    path: "/subjects/physics"
  },
  {
    title: "Chemistry",
    description: "Discover the science of matter and its transformations",
    icon: Book,
    gradient: "from-green-500 via-green-400 to-green-300",
    path: "/subjects/chemistry"
  },
  {
    title: "Biology",
    description: "Understand life processes and living organisms",
    icon: Brain,
    gradient: "from-red-500 via-red-400 to-red-300",
    path: "/subjects/biology"
  },
];

export const SubjectsSection = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Subjects
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link
                to={subject.path}
                className="group block"
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};