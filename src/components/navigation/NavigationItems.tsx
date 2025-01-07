import { Link } from "react-router-dom";

export const subjects = [
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

export const resources = [
  { name: "Notes", path: "/resources/notes" },
  { name: "Practice Questions", path: "/resources/practice" },
  { name: "Past Papers", path: "/resources/papers" },
  { name: "Admin Resources", path: "/admin/resources", adminOnly: true }
];

export const NavigationItems = () => {
  return (
    <>
      <Link 
        to="/subjects" 
        className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
      >
        Subjects
      </Link>
      <div className="relative group">
        <button 
          className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
        >
          Resources
        </button>
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-1">
            {resources.map((resource) => (
              <Link
                key={resource.name}
                to={resource.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {resource.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link 
        to="/pricing" 
        className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
      >
        Pricing
      </Link>
      <Link 
        to="/hire-tutor" 
        className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
      >
        Hire Tutor
      </Link>
    </>
  );
};