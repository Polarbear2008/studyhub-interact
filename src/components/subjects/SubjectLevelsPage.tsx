import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SubjectLevelsPageProps {
  subject: string;
  description: string;
}

export const SubjectLevelsPage = ({ subject, description }: SubjectLevelsPageProps) => {
  const levels = [
    {
      title: "A Level",
      description: `Complete ${subject} curriculum for A Level students`,
    },
    {
      title: "AS Level",
      description: `First year ${subject} content for AS Level`,
    },
    {
      title: "IGCSE",
      description: `Comprehensive ${subject} preparation for IGCSE`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{subject}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={level.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link to={`/subjects/${subject.toLowerCase()}/${level.title.toLowerCase().replace(' ', '-')}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                      {level.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{level.description}</p>
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