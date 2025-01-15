import { Button } from "@/components/ui/button";
import { Chrome, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const SocialLogin = () => {
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
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

  return (
    <>
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
          onClick={handleFacebookLogin}
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
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
    </>
  );
};