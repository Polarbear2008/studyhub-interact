import { GraduationCap } from "lucide-react";
import { BenefitsSection } from "./teacher-signup/BenefitsSection";
import { SignupForm } from "./teacher-signup/SignupForm";

export const TeacherSignup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <GraduationCap className="w-6 h-6 text-primary mr-2" />
            <span className="text-primary font-medium">Join Our Teaching Community</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
            Share Your Knowledge, <br />
            <span className="text-primary">Inspire the Next Generation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our platform as a tutor and help students achieve their academic goals while building a rewarding teaching career.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Signup Form Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Teaching Journey
          </h2>
          <p className="text-gray-600">
            Fill out the form below to begin your application process
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};