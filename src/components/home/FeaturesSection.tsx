import { motion } from "framer-motion";
import { Brain, Calculator, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export const FeaturesSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className={`bg-gradient-to-r ${feature.gradient}`}>
                <feature.icon className="h-8 w-8 text-white" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};