import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface ResourcesMenuProps {
  resources: Array<{ name: string; path: string; description: string }>;
}

export const ResourcesMenu = ({ resources }: ResourcesMenuProps) => {
  return (
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
  );
};