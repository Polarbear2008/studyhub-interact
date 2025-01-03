import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

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

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-purple-50 to-indigo-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-900">Study Notes</h1>
      <div className="space-y-12">
        {Object.entries(examBoards).map(([level, boards]) => (
          <div key={level} className="space-y-4">
            <h2 className="text-2xl font-semibold text-indigo-800">{level}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {boards.map((board) => (
                <Card key={board.path} className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white border-indigo-100">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-medium">
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-5 w-5 text-indigo-600" />
                          <span className="text-indigo-900">{board.name}</span>
                        </div>
                        <span className="text-sm text-indigo-600 opacity-75">{level}</span>
                      </div>
                    </CardTitle>
                    <div className="mt-4 space-y-2">
                      {board.subjects.map((subject) => (
                        <Link
                          key={subject}
                          to={`/resources/notes/${level.toLowerCase()}/${board.path}/${subject.toLowerCase()}`}
                          className="block p-2 text-sm text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                        >
                          {subject}
                        </Link>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};