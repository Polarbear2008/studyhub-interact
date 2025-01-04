import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

export const TutorSection = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Become a Tutor</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of expert educators and help students achieve their academic goals
          </p>
          <Link
            to="/teacher-signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all"
          >
            <UserPlus className="w-5 h-5" />
            Apply Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};