import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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
];

export const adminLinks = [
  { name: "Resources Management", path: "/admin/resources" },
  { name: "Content Scheduling", path: "/admin/scheduling" },
  { name: "Analytics", path: "/admin/analytics" },
  { name: "User Management", path: "/admin/users" },
  { name: "Teacher Applications", path: "/admin/applications" },
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

      {isAdmin && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium">
                Admin
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] p-2">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">{link.name}</div>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  );
};