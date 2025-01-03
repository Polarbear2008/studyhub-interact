import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SubjectsPage = () => {
  const subjectGroups = {
    "A Level": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "Economics",
      "Business Studies",
      "History",
      "Geography"
    ],
    "AS Level": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "Economics",
      "Business Studies"
    ],
    "IGCSE": [
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "English",
      "Computer Science",
      "Economics",
      "Business Studies",
      "History",
      "Geography"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Subjects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(subjectGroups).map(([group, subjects]) => (
            <Card key={group} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">{group}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {subjects.map((subject) => (
                    <li
                      key={subject}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer flex items-center"
                    >
                      <span className="text-gray-700">{subject}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};