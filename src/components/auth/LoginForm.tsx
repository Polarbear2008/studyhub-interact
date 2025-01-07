import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          const { data: { user }, error: checkError } = await supabase.auth.getUser(email);
          
          if (!checkError && user) {
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

  return (
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
  );
};