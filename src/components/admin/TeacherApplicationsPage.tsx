import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, X, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TeacherApplication = {
  id: string;
  full_name: string;
  email: string;
  qualifications: string;
  subjects: string[];
  experience_years: number;
  bio: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export const TeacherApplicationsPage = () => {
  const [applications, setApplications] = useState<TeacherApplication[]>([]);
  const { toast } = useToast();

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('teacher_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load teacher applications",
        variant: "destructive",
      });
      return;
    }

    setApplications(data || []);
  };

  const handleUpdateStatus = async (applicationId: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('teacher_applications')
      .update({ status: newStatus })
      .eq('id', applicationId);

    if (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Application ${newStatus} successfully`,
    });

    // If approved, set user role to teacher
    if (newStatus === 'approved') {
      const application = applications.find(app => app.id === applicationId);
      if (application) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .upsert({
            user_id: application.id,
            role: 'teacher'
          });

        if (roleError) {
          console.error('Error setting teacher role:', roleError);
          toast({
            title: "Warning",
            description: "Application approved but failed to set teacher role",
            variant: "destructive",
          });
        }
      }
    }

    // Refresh applications list
    fetchApplications();
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <GraduationCap className="h-8 w-8" />
          Teacher Applications
        </h1>

        <div className="grid gap-6">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-center">No applications found</p>
              </CardContent>
            </Card>
          ) : (
            applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{application.full_name}</span>
                    {getStatusBadge(application.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p>{application.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Qualifications</p>
                      <p>{application.qualifications}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Subjects</p>
                      <div className="flex flex-wrap gap-2">
                        {application.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Experience</p>
                      <p>{application.experience_years} years</p>
                    </div>
                    {application.bio && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Bio</p>
                        <p className="whitespace-pre-wrap">{application.bio}</p>
                      </div>
                    )}
                    
                    {application.status === 'pending' && (
                      <div className="flex gap-4 mt-4">
                        <Button
                          onClick={() => handleUpdateStatus(application.id, 'approved')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleUpdateStatus(application.id, 'rejected')}
                          variant="destructive"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};