import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Sarah M.",
    role: "A-Level Student",
    content: "The tutors here are amazing! My grades improved significantly.",
    rating: 5,
  },
  {
    name: "James W.",
    role: "Parent",
    content: "Best investment in my child's education. Highly recommended!",
    rating: 5,
  },
  {
    name: "David L.",
    role: "IGCSE Student",
    content: "The practice resources helped me ace my exams.",
    rating: 4,
  },
];

export const ReviewsSection = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-lg text-gray-600">
            Trusted by thousands of students worldwide
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{review.content}</p>
                  <div className="text-sm">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-gray-500">{review.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};