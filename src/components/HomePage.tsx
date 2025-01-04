import { Footer } from "./Footer";
import { HeroSection } from "./home/HeroSection";
import { FeaturesSection } from "./home/FeaturesSection";
import { SubjectsSection } from "./home/SubjectsSection";
import { ReviewsSection } from "./home/ReviewsSection";
import { TutorSection } from "./home/TutorSection";

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TutorSection />
      <ReviewsSection />
      <SubjectsSection />
      <Footer />
    </div>
  );
};