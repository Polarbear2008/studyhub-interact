import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

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
    { name: "Past Papers", path: "/resources/papers" },
    { name: "Admin Resources", path: "/admin/resources", adminOnly: true }
  ];

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-primary">Sir Michael</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link 
              to="/subjects" 
              className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium"
            >
              Subjects
            </Link>

            {/* Resources Dropdown */}
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

            <Link to="/pricing" className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium">
              Pricing
            </Link>
            <Link to="/hire-tutor" className="text-gray-600 hover:text-primary px-2 py-2 rounded-md text-sm font-medium">
              Hire Tutor
            </Link>
            
            {!user ? (
              <>
                <Link to="/student-login">
                  <Button variant="outline" size="sm" className="hidden lg:inline-flex">
                    Login
                  </Button>
                </Link>
                <Link to="/student-signup">
                  <Button size="sm" className="hidden lg:inline-flex">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="hidden lg:inline-flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full bg-white z-50 shadow-lg transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/subjects"
            className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Subjects
          </Link>

          {/* Mobile Resources Menu */}
          <div className="space-y-1">
            <button
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Resources
            </button>
            {resources.map((resource) => (
              <Link
                key={resource.name}
                to={resource.path}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={() => setIsOpen(false)}
              >
                {resource.name}
              </Link>
            ))}
          </div>

          <Link
            to="/pricing"
            className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/hire-tutor"
            className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Hire Tutor
          </Link>
          
          {!user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                to="/student-login"
                className="block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link
                to="/student-signup"
                className="block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};