import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const ResourcesPapersPage = () => {
  const examBoards = {
    "A-Level": [
      { name: "AQA", path: "aqa" },
      { name: "CIE", path: "cie" }
    ],
    "AP": [
      { name: "College Board", path: "college-board" }
    ],
    "GCSE": [
      { name: "AQA", path: "aqa" },
      { name: "Edexcel", path: "edexcel" },
      { name: "OCR", path: "ocr" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Past Papers</h1>
      <div className="space-y-12">
        {Object.entries(examBoards).map(([level, boards]) => (
          <div key={level} className="space-y-4">
            <h2 className="text-2xl font-semibold">{level}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {boards.map((board) => (
                <Card key={board.path} className="hover:shadow-lg transition-shadow bg-pink-50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-medium">
                      <Link 
                        to={`/resources/papers/${level.toLowerCase()}/${board.path}`}
                        className="flex items-center justify-between group"
                      >
                        <span className="text-sm">{level}</span>
                        <span className="text-gray-600">{board.name}</span>
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