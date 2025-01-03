import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
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
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              {subjects.map((subject) => (
                <Link
                  key={subject}
                  to={`/subjects/${subject.toLowerCase()}`}
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {subject}
                </Link>
              ))}
            </div>
            <Link to="/student-login">
              <Button variant="outline" className="ml-4">
                Student Login
              </Button>
            </Link>
            <Link to="/teacher-login">
              <Button variant="outline">
                Teacher Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
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
            {subjects.map((subject) => (
              <Link
                key={subject}
                to={`/subjects/${subject.toLowerCase()}`}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {subject}
              </Link>
            ))}
            <Link
              to="/student-login"
              className="block px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="outline" className="w-full">
                Student Login
              </Button>
            </Link>
            <Link
              to="/teacher-login"
              className="block px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="outline" className="w-full">
                Teacher Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};