import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PenTool, BookOpen, Activity, LineChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ResourcesPracticePage = () => {
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
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-emerald-50 to-teal-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-900">Interactive Practice</h1>
      
      <Tabs defaultValue="quizzes" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="space-y-12">
          {Object.entries(examBoards).map(([level, boards]) => (
            <div key={level} className="space-y-4">
              <h2 className="text-2xl font-semibold text-emerald-800">{level}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {boards.map((board) => (
                  <Card key={board.path} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border-emerald-100">
                    <CardHeader className="p-6">
                      <CardTitle className="text-lg font-medium">
                        <div className="flex flex-col space-y-3 group">
                          <div className="flex justify-center">
                            <PenTool className="h-8 w-8 text-emerald-600" />
                          </div>
                          <div className="text-center">
                            <div className="text-emerald-900 font-bold">{board.name}</div>
                            <div className="text-sm text-emerald-600 mt-1">{level}</div>
                          </div>
                        </div>
                      </CardTitle>
                      <div className="mt-4 space-y-2">
                        {board.subjects.map((subject) => (
                          <Link
                            key={subject}
                            to={`/resources/practice/${level.toLowerCase()}/${board.path}/${subject.toLowerCase()}/quizzes`}
                            className="block p-2 text-sm text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors text-center"
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
        </TabsContent>

        <TabsContent value="interactive" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-600" />
                  Physics Simulations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Interactive physics simulations for better understanding of concepts.
                </p>
                <Link
                  to="/resources/practice/simulations/physics"
                  className="mt-4 inline-block text-emerald-600 hover:text-emerald-700"
                >
                  Explore simulations →
                </Link>
              </CardContent>
            </Card>

            <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-emerald-600" />
                  Math Graphing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Interactive graphing tools for mathematical functions and analysis.
                </p>
                <Link
                  to="/resources/practice/graphing/math"
                  className="mt-4 inline-block text-emerald-600 hover:text-emerald-700"
                >
                  Start graphing →
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                Your Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Track your progress across different subjects and topics.
              </p>
              <Link
                to="/resources/practice/progress"
                className="inline-block text-emerald-600 hover:text-emerald-700"
              >
                View detailed progress →
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};