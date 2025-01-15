import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { SocialLogin } from "./auth/SocialLogin";
import { ForgotPassword } from "./auth/ForgotPassword";
import { LoginForm } from "./auth/LoginForm";

export const StudentLogin = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

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
            <SocialLogin />
            <LoginForm />

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
                <Button
                  variant="link"
                  className="font-medium text-blue-600 hover:text-blue-500 p-0 h-auto"
                  onClick={() => navigate('/student-signup')}
                >
                  Sign up
                </Button>
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