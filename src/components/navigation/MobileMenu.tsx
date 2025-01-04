import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  subjects: Record<string, string[]>;
  resources: Array<{ name: string; path: string; description: string }>;
}

export const MobileMenu = ({ isOpen, setIsOpen, subjects, resources }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
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
  );
};