import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Apple, Chrome } from "lucide-react";

export const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle authentication here
    toast({
      title: "Login Attempted",
      description: "This is a demo. Student authentication would happen here.",
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Google authentication would happen here.",
    });
  };

  const handleAppleLogin = () => {
    toast({
      title: "Apple Login",
      description: "Apple authentication would happen here.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Student Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
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
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
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
                  className="mt-1"
                  placeholder="Enter your email"
                />
              </div>
              <div>
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
                  className="mt-1"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in with Email
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};