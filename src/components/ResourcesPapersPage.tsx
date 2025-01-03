import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export const ResourcesPapersPage = () => {
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
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-amber-50 to-orange-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-900">Past Papers</h1>
      <div className="space-y-12">
        {Object.entries(examBoards).map(([level, boards]) => (
          <div key={level} className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-800">{level}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {boards.map((board) => (
                <Card key={board.path} className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl bg-white border-orange-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/5 group-hover:to-orange-500/5 transition-all duration-300" />
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-medium">
                      <Link 
                        to={`/resources/papers/${level.toLowerCase()}/${board.path}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="h-6 w-6 text-orange-600" />
                          <div>
                            <div className="text-orange-900 font-bold">{board.name}</div>
                            <div className="text-sm text-orange-600/80">{level}</div>
                          </div>
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