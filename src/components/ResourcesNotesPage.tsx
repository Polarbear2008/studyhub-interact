import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const ResourcesNotesPage = () => {
  const examBoards = {
    "A-Level": [
      { 
        name: "AQA", 
        path: "aqa",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "CIE", 
        path: "cie",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "Edexcel", 
        path: "edexcel",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "OCR", 
        path: "ocr",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      }
    ],
    "AS-Level": [
      { 
        name: "AQA", 
        path: "aqa",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "CIE", 
        path: "cie",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "Edexcel", 
        path: "edexcel",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "OCR", 
        path: "ocr",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      }
    ],
    "IGCSE": [
      { 
        name: "AQA", 
        path: "aqa",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "CIE", 
        path: "cie",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "Edexcel", 
        path: "edexcel",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      },
      { 
        name: "OCR", 
        path: "ocr",
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"]
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const levelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.02,
      color: "#4F46E5",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold mb-8 text-center text-indigo-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
      >
        Study Notes
      </motion.h1>
      <motion.div className="space-y-12" variants={containerVariants}>
        {Object.entries(examBoards).map(([level, boards], levelIndex) => (
          <motion.div
            key={level}
            className="space-y-4"
            variants={levelVariants}
            custom={levelIndex}
          >
            <motion.h2
              className="text-2xl font-semibold text-indigo-800 relative pl-4 border-l-4 border-indigo-500"
              variants={levelVariants}
            >
              {level}
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {boards.map((board, boardIndex) => (
                <motion.div
                  key={board.path}
                  variants={cardVariants}
                  whileHover="hover"
                  custom={boardIndex}
                >
                  <Card className="relative overflow-hidden backdrop-blur-sm bg-white/90 border-indigo-100 shadow-lg">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <CardHeader className="p-4 relative z-10">
                      <CardTitle className="text-lg font-medium">
                        <div className="flex items-center justify-between group">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <BookOpen className="h-5 w-5 text-indigo-600" />
                            </motion.div>
                            <span className="text-indigo-900 font-semibold">{board.name}</span>
                          </div>
                          <span className="text-sm text-indigo-600 opacity-75">{level}</span>
                        </div>
                      </CardTitle>
                      <motion.div
                        className="mt-4 space-y-2"
                        variants={containerVariants}
                      >
                        {board.subjects.map((subject) => (
                          <motion.div
                            key={subject}
                            variants={linkVariants}
                            whileHover="hover"
                          >
                            <Link
                              to={`/resources/notes/${level.toLowerCase()}/${board.path}/${subject.toLowerCase()}`}
                              className="block p-2 text-sm text-indigo-700 hover:bg-indigo-50 rounded-md transition-all duration-300 relative overflow-hidden group"
                            >
                              <motion.span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 origin-left"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                              {subject}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};