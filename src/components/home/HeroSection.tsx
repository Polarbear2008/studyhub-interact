import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            Transform Your Learning Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-white/90"
          >
            Access comprehensive study materials, expert tutoring, and interactive
            practice resources to excel in your academic journey.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex justify-center gap-4"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};