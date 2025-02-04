import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-24 px-4 sm:px-6 lg:px-8">
          {/* Text Content */}
          <div className="text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              Supercharge Your Grades ⚡
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-xl text-white/90"
            >
              Access comprehensive study materials, expert tutoring, and interactive
              practice resources to excel in your academic journey.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex gap-4"
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

          {/* Image Grid Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative grid grid-cols-2 gap-4 h-[500px]"
          >
            {/* Main Image */}
            <div className="col-span-2 h-64 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Student studying with textbooks and digital devices"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Supporting Images */}
            <div className="h-48 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Chemistry laboratory experiment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-48 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Modern classroom with interactive whiteboard"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};