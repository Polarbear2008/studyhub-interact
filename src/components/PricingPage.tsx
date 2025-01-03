import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const PricingPage = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: string) => {
    toast.success(`Selected ${plan} plan! Redirecting to signup...`);
    navigate("/student-signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Learning Journey
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select the perfect plan that suits your educational needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card className="relative overflow-hidden border-2 hover:border-purple-400 transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 transform rotate-45 translate-x-8 -translate-y-8"></div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Basic</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$9</span>
                <span className="text-gray-600 dark:text-gray-300">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  "Access to basic study materials",
                  "Limited practice questions",
                  "Community forum access",
                  "Email support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => handleSubscribe('Basic')}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Plan */}
          <Card className="relative overflow-hidden border-2 border-purple-500 transform scale-105 shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
            <div className="absolute top-6 right-[-24px] rotate-45 bg-purple-500 text-white px-8 py-1 text-sm">
              Popular
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Standard</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Most popular choice</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$19</span>
                <span className="text-gray-600 dark:text-gray-300">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  "Everything in Basic",
                  "Unlimited practice questions",
                  "Past papers access",
                  "1-on-1 tutor support",
                  "Progress tracking",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => handleSubscribe('Standard')}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="relative overflow-hidden border-2 hover:border-purple-400 transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 transform rotate-45 translate-x-8 -translate-y-8"></div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Premium</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">For serious learners</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$29</span>
                <span className="text-gray-600 dark:text-gray-300">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  "Everything in Standard",
                  "Priority tutor support",
                  "Live group sessions",
                  "Personalized study plan",
                  "Advanced analytics",
                  "Certificate of completion",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => handleSubscribe('Premium')}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};