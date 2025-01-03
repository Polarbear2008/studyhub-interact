import { BookOpen, Clock, DollarSign, Users } from "lucide-react";

const benefits = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Connect with Students",
    description: "Reach students looking for expert tutoring in your subject area"
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Flexible Schedule",
    description: "Set your own hours and teach when it's convenient for you"
  },
  {
    icon: <DollarSign className="w-6 h-6 text-primary" />,
    title: "Competitive Earnings",
    description: "Set your own rates and earn what you deserve"
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Teaching Resources",
    description: "Access our library of teaching materials and resources"
  }
];

export const BenefitsSection = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Teach with Us?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};