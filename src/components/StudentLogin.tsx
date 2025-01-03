import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Apple, Chrome } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle login here
    toast({
      title: "Login Attempted",
      description: "This is a demo. Student login would happen here.",
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "To implement secure Google authentication, we recommend connecting to a backend service like Supabase. For now, this is just a demo.",
      duration: 5000,
    });
  };

  const handleAppleLogin = () => {
    toast({
      title: "Apple Login",
      description: "To implement secure Apple authentication, we recommend connecting to a backend service like Supabase. For now, this is just a demo.",
      duration: 5000,
    });
  };

  const handleTeacherRedirect = () => {
    navigate('/teacher-login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <Card className="w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Student Login
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Welcome back! Please enter your details
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105"
                onClick={handleGoogleLogin}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105"
                onClick={handleAppleLogin}
              >
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
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
                Sign in with Email
              </Button>
            </form>

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
              onClick={handleTeacherRedirect}
            >
              Login as a Teacher
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};