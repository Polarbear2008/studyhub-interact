import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SocialLogin } from "./auth/SocialLogin";
import { ForgotPassword } from "./auth/ForgotPassword";

export const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          const { data: { users } } = await supabase.auth.admin.listUsers();
          const userExists = users?.some(user => user.email === email);

          if (userExists) {
            toast({
              title: "Incorrect Password",
              description: "The password you entered is incorrect. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Account Not Found",
              description: "No account found with this email. Would you like to sign up?",
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/student-signup')}
                >
                  Sign Up
                </Button>
              ),
            });
          }
        } else {
          throw error;
        }
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <Card className="w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Welcome Back!
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Sign in to continue your learning journey
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SocialLogin
              onGoogleLogin={handleGoogleLogin}
              onFacebookLogin={handleFacebookLogin}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-4 text-center space-y-4">
              <Button
                variant="link"
                className="text-sm text-blue-600 hover:text-blue-500"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot your password?
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a
                  href="/student-signup"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </a>
              </p>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 transition-all duration-300 transform hover:scale-105 hover:bg-gray-50"
              onClick={() => navigate('/teacher-login')}
            >
              Login as a Teacher
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};