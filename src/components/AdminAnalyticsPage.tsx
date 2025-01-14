import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, GraduationCap, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

export const AdminAnalyticsPage = () => {
  // Fetch total users count
  const { data: totalUsers = 0 } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  // Fetch active students (users who have study sessions in the last 30 days)
  const { data: activeStudents = 0 } = useQuery({
    queryKey: ['activeStudents'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count } = await supabase
        .from('study_sessions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());
      return count || 0;
    }
  });

  // Fetch total resources accessed
  const { data: resourcesAccessed = 0 } = useQuery({
    queryKey: ['resourcesAccessed'],
    queryFn: async () => {
      const { count } = await supabase
        .from('resource_ratings')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  // Fetch total quiz completions
  const { data: quizCompletions = 0 } = useQuery({
    queryKey: ['quizCompletions'],
    queryFn: async () => {
      const { count } = await supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  // Fetch monthly activity data
  const { data: monthlyData = [] } = useQuery({
    queryKey: ['monthlyActivity'],
    queryFn: async () => {
      const currentDate = new Date();
      const last4Months = Array.from({ length: 4 }, (_, i) => {
        const date = subMonths(currentDate, i);
        return {
          month: format(date, 'MMM'),
          start: startOfMonth(date),
          end: endOfMonth(date)
        };
      }).reverse();

      const promises = last4Months.map(async ({ month, start, end }) => {
        const [studentsCount, resourcesCount, quizzesCount] = await Promise.all([
          supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', start.toISOString())
            .lt('created_at', end.toISOString())
            .then(({ count }) => count || 0),
          supabase
            .from('resources')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', start.toISOString())
            .lt('created_at', end.toISOString())
            .then(({ count }) => count || 0),
          supabase
            .from('quiz_attempts')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', start.toISOString())
            .lt('created_at', end.toISOString())
            .then(({ count }) => count || 0)
        ]);

        return {
          name: month,
          students: studentsCount,
          resources: resourcesCount,
          quizzes: quizzesCount
        };
      });

      return Promise.all(promises);
    }
  });

  // Fetch popular resources
  const { data: popularResources = [] } = useQuery({
    queryKey: ['popularResources'],
    queryFn: async () => {
      const { data } = await supabase
        .from('resources')
        .select(`
          id,
          title,
          subject,
          resource_ratings (count)
        `)
        .limit(4)
        .order('created_at', { ascending: false });

      return data?.map(resource => ({
        title: resource.title,
        subject: resource.subject,
        views: resource.resource_ratings?.[0]?.count || 0
      })) || [];
    }
  });

  const userStats = [
    { 
      title: "Total Users", 
      value: totalUsers.toString(), 
      icon: Users, 
      change: "+12%" 
    },
    { 
      title: "Active Students", 
      value: activeStudents.toString(), 
      icon: GraduationCap, 
      change: "+5%" 
    },
    { 
      title: "Resources Accessed", 
      value: resourcesAccessed.toString(), 
      icon: BookOpen, 
      change: "+18%" 
    },
    { 
      title: "Quiz Completions", 
      value: quizCompletions.toString(), 
      icon: Activity, 
      change: "+8%" 
    },
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
                {popularResources.map((resource, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{resource.title}</p>
                      <p className="text-sm text-gray-500">{resource.subject}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {resource.views} views
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
