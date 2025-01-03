import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const ResourcesNotesPage = () => {
  const subjectGroups = {
    "A Level": [
      "Mathematics", "Physics", "Biology", "Chemistry", "English",
      "Computer Science", "Economics", "Business Studies", "History", "Geography"
    ],
    "AS Level": [
      "Mathematics", "Physics", "Biology", "Chemistry", "English",
      "Computer Science", "Economics", "Business Studies"
    ],
    "IGCSE": [
      "Mathematics", "Physics", "Biology", "Chemistry", "English",
      "Computer Science", "Economics", "Business Studies", "History", "Geography"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Study Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(subjectGroups).map(([level, subjects]) => (
          <Card key={level} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">{level}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {subjects.map((subject) => (
                  <li
                    key={subject}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                  >
                    <Link to={`/resources/notes/${level.toLowerCase().replace(' ', '-')}/${subject.toLowerCase().replace(' ', '-')}`} className="text-gray-700">
                      {subject}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};