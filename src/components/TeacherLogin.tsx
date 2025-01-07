import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SocialLogin } from "./auth/SocialLogin";
import { ForgotPassword } from "./auth/ForgotPassword";

export const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle authentication here
    setIsLoggedIn(true);
    toast({
      title: "Login Successful",
      description: "Welcome back, teacher!",
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "To implement secure Google authentication, we recommend connecting to a backend service like Supabase. For now, this is just a demo.",
      duration: 5000,
    });
  };

  const handleFacebookLogin = () => {
    toast({
      title: "Facebook Login",
      description: "To implement secure Facebook authentication, we recommend connecting to a backend service like Supabase. For now, this is just a demo.",
      duration: 5000,
    });
  };

  const handleNoteUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle note upload here
    toast({
      title: "Note Uploaded",
      description: "Your note has been successfully uploaded.",
    });
    setNote("");
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <Card className="max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Upload Teaching Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNoteUpload} className="space-y-6">
              <div>
                <Label htmlFor="note">Revision Notes</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter your revision notes here..."
                  className="mt-1 h-40 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Upload Notes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <Card className="w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Teacher Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SocialLogin
              onGoogleLogin={handleGoogleLogin}
              onFacebookLogin={handleFacebookLogin}
            />

            <form onSubmit={handleLogin} className="space-y-6">
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
              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  Sign in
                </Button>
                <Button
                  variant="link"
                  className="w-full text-sm text-blue-600 hover:text-blue-500"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot your password?
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};