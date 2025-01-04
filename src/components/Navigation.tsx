import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

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
            {/* Subjects Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                Subjects
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {Object.entries(subjects).map(([level, subjectList]) => (
                    <div key={level} className="px-4 py-2">
                      <h3 className="text-sm font-semibold text-gray-900">{level}</h3>
                      <div className="mt-2 space-y-1">
                        {subjectList.map((subject) => (
                          <Link
                            key={subject}
                            to={`/subjects/${level.toLowerCase().replace(/ /g, '-')}/${subject.toLowerCase().replace(/ /g, '-')}`}
                            className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                          >
                            {subject}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {resources.map((resource) => (
                    <Link
                      key={resource.name}
                      to={resource.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <div className="font-medium text-gray-900">{resource.name}</div>
                      <div className="text-xs text-gray-500">{resource.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Subjects Menu */}
            {Object.entries(subjects).map(([level, subjectList]) => (
              <div key={level} className="py-2">
                <h3 className="px-3 text-sm font-semibold text-gray-900">{level}</h3>
                <div className="mt-1 space-y-1">
                  {subjectList.map((subject) => (
                    <Link
                      key={subject}
                      to={`/subjects/${level.toLowerCase().replace(/ /g, '-')}/${subject.toLowerCase().replace(/ /g, '-')}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {subject}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile Resources Menu */}
            <div className="py-2">
              <h3 className="px-3 text-sm font-semibold text-gray-900">Resources</h3>
              <div className="mt-1 space-y-1">
                {resources.map((resource) => (
                  <Link
                    key={resource.name}
                    to={resource.path}
                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {resource.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/pricing"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/hire-tutor"
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Hire Tutor
            </Link>
            <div className="px-3 py-2">
              <Link
                to="/student-login"
                className="block mb-2"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link
                to="/student-signup"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};