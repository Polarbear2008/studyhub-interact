import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  { name: "Admin Resources", path: "/admin/resources", adminOnly: true },
  { name: "Content Scheduling", path: "/admin/scheduling", adminOnly: true },
  { name: "Analytics", path: "/admin/analytics", adminOnly: true },
  { name: "User Management", path: "/admin/users", adminOnly: true }
];

export const NavigationItems = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .single();
        
        setIsAdmin(!!roles);
      }
    };

    checkAdminStatus();
  }, []);

  const filteredResources = resources.filter(resource => 
    !resource.adminOnly || (resource.adminOnly && isAdmin)
  );

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
            {filteredResources.map((resource) => (
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