import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import { ResourcesMenu } from "./navigation/ResourcesMenu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const subjects = {
    "A Level": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "Economics",
      "Business Studies"
    ],
    "AS Level": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science"
    ],
    "IGCSE": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "History",
      "Geography"
    ]
  };

  const resources = [
    { name: "Study Notes", path: "/resources/notes", description: "Comprehensive study materials" },
    { name: "Practice Questions", path: "/resources/practice", description: "Test your knowledge" },
    { name: "Past Papers", path: "/resources/papers", description: "Exam preparation" }
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
            {/* Subjects Links (No Dropdown) */}
            <Link to="/subjects/a-level" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              A Level
            </Link>
            <Link to="/subjects/as-level" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              AS Level
            </Link>
            <Link to="/subjects/igcse" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              IGCSE
            </Link>

            {/* Resources Dropdown */}
            <ResourcesMenu resources={resources} />

            <Link to="/pricing" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Pricing
            </Link>
            <Link to="/hire-tutor" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Hire Tutor
            </Link>
            <Link to="/student-login">
              <Button variant="outline" className="ml-4">
                Login
              </Button>
            </Link>
            <Link to="/student-signup">
              <Button>
                Sign Up
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        subjects={subjects}
        resources={resources}
      />
    </nav>
  );
};