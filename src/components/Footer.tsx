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
    { 
      name: "Business Partnerships", 
      path: "/business",
      description: "Partner with us to provide premium educational resources to your organization's members or employees."
    },
    { 
      name: "Corporate Tutoring", 
      path: "/corporate",
      description: "Tailored tutoring solutions for businesses looking to upskill their workforce or provide educational benefits to employees' families."
    },
  ];

  const tutors = [
    { name: "GCSE Tutors", path: "/tutors/gcse" },
    { name: "IGCSE Tutors", path: "/tutors/igcse" },
    { name: "A-Level Tutors", path: "/tutors/a-level" },
    { name: "Oxbridge Tutors", path: "/tutors/oxbridge" },
  ];

  const resources = [
    { name: "GCSE Resources", path: "/resources/gcse" },
    { name: "IGCSE Resources", path: "/resources/igcse" },
    { name: "A-Level Resources", path: "/resources/a-level" },
    { name: "Study Notes", path: "/resources/notes" },
    { name: "Practice Questions", path: "/resources/practice" },
    { name: "Past Papers", path: "/resources/papers" },
  ];

  return (
    <footer className="bg-white py-8 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tutors Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tutors</h3>
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
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
          <div className="space-y-6">
            <Link to="/" className="block">
              <img
                src="/lovable-uploads/42b8b596-9401-496c-9ead-cfe109c222ae.png"
                alt="Learn-Mate"
                className="h-8"
              />
            </Link>
            <div className="space-y-2">
              <p className="text-gray-600">info@learn-mate.com</p>
              <p className="text-gray-600">+44 (0)1865 306636</p>
              <p className="text-sm text-gray-500">
                Office Hours: Mon-Fri 9am-6pm GMT
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/message"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="space-y-2">
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
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Learn-Mate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};