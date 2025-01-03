import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PenTool } from "lucide-react";

export const ResourcesPracticePage = () => {
  const examBoards = {
    "A-Level": [
      { name: "AQA", path: "aqa" },
      { name: "CIE", path: "cie" },
      { name: "Edexcel", path: "edexcel" },
      { name: "OCR", path: "ocr" }
    ],
    "AS-Level": [
      { name: "AQA", path: "aqa" },
      { name: "CIE", path: "cie" },
      { name: "Edexcel", path: "edexcel" },
      { name: "OCR", path: "ocr" }
    ],
    "IGCSE": [
      { name: "AQA", path: "aqa" },
      { name: "CIE", path: "cie" },
      { name: "Edexcel", path: "edexcel" },
      { name: "OCR", path: "ocr" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-emerald-50 to-teal-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-900">Practice Questions</h1>
      <div className="space-y-12">
        {Object.entries(examBoards).map(([level, boards]) => (
          <div key={level} className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-800">{level}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {boards.map((board) => (
                <Card key={board.path} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border-emerald-100">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-medium">
                      <Link 
                        to={`/resources/practice/${level.toLowerCase()}/${board.path}`}
                        className="flex flex-col space-y-3 group"
                      >
                        <div className="flex justify-center">
                          <PenTool className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div className="text-center">
                          <div className="text-emerald-900 font-bold">{board.name}</div>
                          <div className="text-sm text-emerald-600 mt-1">{level}</div>
                        </div>
                      </Link>
                    </CardTitle>
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