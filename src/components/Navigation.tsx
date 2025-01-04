import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const subjects = [
    "AS & A Level Mathematics",
    "AS & A Level Physics",
    "AS & A Level Biology",
    "AS & A Level Chemistry",
    "AS & A Level English",
    "IGCSE Mathematics",
    "IGCSE Physics",
    "IGCSE Biology",
    "IGCSE Chemistry",
    "IGCSE English",
    "History",
    "Geography",
    "Computer Science",
    "Economics",
    "Business Studies"
  ];

  const resources = [
    { name: "Notes", path: "/resources/notes" },
    { name: "Practice Questions", path: "/resources/practice" },
    { name: "Past Papers", path: "/resources/papers" }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">EduHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/subjects" 
              className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Subjects
            </Link>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Resources
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {resources.map((resource) => (
                    <Link
                      key={resource.name}
                      to={resource.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {resource.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/pricing" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
              Pricing
            </Link>
            
            <Link to="/hire-tutor">
              <AnimatedButton variant="outline" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none hover:opacity-90">
                Find Tutor
              </AnimatedButton>
            </Link>
            
            <Link to="/student-login">
              <AnimatedButton variant="outline" className="hover:bg-gray-50">
                Login
              </AnimatedButton>
            </Link>
            
            <Link to="/student-signup">
              <AnimatedButton className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90">
                Sign Up
              </AnimatedButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/subjects"
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Subjects
            </Link>

            {/* Mobile Resources Menu */}
            <div className="space-y-1">
              <button
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
              >
                Resources
              </button>
              {resources.map((resource) => (
                <Link
                  key={resource.name}
                  to={resource.path}
                  className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {resource.name}
                </Link>
              ))}
            </div>

            <Link
              to="/pricing"
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/hire-tutor"
              className="block px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              <AnimatedButton variant="outline" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none hover:opacity-90">
                Find Tutor
              </AnimatedButton>
            </Link>
            <Link
              to="/student-login"
              className="block px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              <AnimatedButton variant="outline" className="w-full hover:bg-gray-50">
                Login
              </AnimatedButton>
            </Link>
            <Link
              to="/student-signup"
              className="block px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              <AnimatedButton className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90">
                Sign Up
              </AnimatedButton>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};