import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Custom TikTok icon component
const TikTokIcon = ({ className = "", size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const company = [
    { name: "Tutor Applications", path: "/teacher-signup" },
    { name: "Business Partnerships", path: "/business" },
    { name: "Corporate Tutoring", path: "/corporate" },
  ];

  const tutors = [
    { name: "GCSE Tutors", path: "/tutors/gcse" },
    { name: "IGCSE Tutors", path: "/tutors/igcse" },
    { name: "A-Level Tutors", path: "/tutors/a-level" },
    { name: "IB Tutors", path: "/tutors/ib" },
    { name: "AP Tutors", path: "/tutors/ap" },
    { name: "Oxbridge Tutors", path: "/tutors/oxbridge" },
    { name: "US Admissions Tutors", path: "/tutors/us-admissions" },
  ];

  const resources = [
    { name: "GCSE Resources", path: "/resources/gcse" },
    { name: "IGCSE Resources", path: "/resources/igcse" },
    { name: "A-Level Resources", path: "/resources/a-level" },
    { name: "IB Resources", path: "/resources/ib" },
    { name: "AP Resources", path: "/resources/ap" },
    { name: "Study Notes", path: "/resources/notes" },
    { name: "Practice Questions", path: "/resources/practice" },
    { name: "Past Papers", path: "/resources/papers" },
  ];

  return (
    <footer className="bg-white py-12 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutors Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tutors</h3>
            <ul className="space-y-2">
              {tutors.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <Link to="/" className="block mb-4">
              <img
                src="/lovable-uploads/34d657a1-cd67-49d6-b541-ac2dd86b032e.png"
                alt="TutorChase"
                className="h-8"
              />
            </Link>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">info@tutorchase.com</p>
              <p className="text-gray-600">+44 (0)1865 306636</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/message"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <TikTokIcon className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6 space-y-2">
              <Link
                to="/privacy"
                className="block text-gray-600 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block text-gray-600 hover:text-primary transition-colors"
              >
                Terms and Conditions
              </Link>
              <Link
                to="/safeguarding"
                className="block text-gray-600 hover:text-primary transition-colors"
              >
                Safeguarding
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};