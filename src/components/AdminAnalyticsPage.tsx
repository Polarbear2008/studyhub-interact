import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, GraduationCap, Activity } from "lucide-react";

export const AdminAnalyticsPage = () => {
  const userStats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Active Students", value: "892", icon: GraduationCap, change: "+5%" },
    { title: "Resources Accessed", value: "3,456", icon: BookOpen, change: "+18%" },
    { title: "Quiz Completions", value: "567", icon: Activity, change: "+8%" },
  ];

  const monthlyData = [
    { name: 'Jan', students: 65, resources: 45, quizzes: 30 },
    { name: 'Feb', students: 75, resources: 55, quizzes: 40 },
    { name: 'Mar', students: 85, resources: 65, quizzes: 50 },
    { name: 'Apr', students: 95, resources: 75, quizzes: 60 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#8884d8" name="New Students" />
                    <Bar dataKey="resources" fill="#82ca9d" name="Resources Used" />
                    <Bar dataKey="quizzes" fill="#ffc658" name="Quizzes Taken" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Resource {i}</p>
                      <p className="text-sm text-gray-500">Subject {i}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.floor(Math.random() * 1000)} views
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};