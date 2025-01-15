import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NavigationItems } from "./navigation/NavigationItems";
import { ProfileBadge } from "./ProfileBadge";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

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
            <NavigationItems />
            
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
              <div className="flex items-center space-x-4">
                <ProfileBadge email={user.email} />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hidden lg:inline-flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
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
          <NavigationItems />
          
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
              <div className="flex items-center px-3 py-2">
                <ProfileBadge email={user.email} />
              </div>
              <Button
                variant="outline"
                className="w-full mt-2 flex items-center justify-center gap-2"
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