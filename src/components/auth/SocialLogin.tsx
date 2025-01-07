import { Button } from "@/components/ui/button";
import { Chrome, Facebook } from "lucide-react";

interface SocialLoginProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
}

export const SocialLogin = ({ onGoogleLogin, onFacebookLogin }: SocialLoginProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105"
          onClick={onGoogleLogin}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant="outline"
          className="w-full hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105"
          onClick={onFacebookLogin}
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