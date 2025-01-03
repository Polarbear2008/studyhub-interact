import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Star, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export const HireTutor = () => {
  const featuredTutors = [
    {
      name: "Dr. Sarah Mitchell",
      image: "/lovable-uploads/6fad200d-56d6-4627-a36f-7a9bcc3fc156.png",
      qualifications: "PhD in Physics | Cambridge University",
      subjects: ["Physics", "Mathematics", "Chemistry"],
      rating: 4.9,
      reviews: 127,
      description: "Experienced tutor specializing in A-Level Physics and Mathematics. Passionate about making complex concepts accessible to all students."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Professional Online Tutors
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Learn from qualified tutors at a time that fits your schedule.
          Trusted by 5000+ parents and students globally.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              4.9/5 based on 500+ reviews
            </span>
          </div>
        </div>
      </div>

      {/* Tutor Spotlight Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Tutor Spotlight
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredTutors.map((tutor, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                      <UserRound className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{tutor.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>{tutor.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {tutor.rating} ({tutor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{tutor.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button className="w-full">
                    View Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    Book Trial Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Teaching?
        </h2>
        <p className="text-gray-600 mb-8">
          Join our community of professional tutors and help students achieve their academic goals.
        </p>
        <Link to="/teacher-signup">
          <Button size="lg" className="px-8">
            Become a Tutor
          </Button>
        </Link>
      </div>
    </div>
  );
};