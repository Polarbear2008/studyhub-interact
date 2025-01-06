import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Explore Our Subjects
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Comprehensive courses designed to help you excel in your studies
        </p>
      </div>
    </div>
  );
};