import { useEffect, useState } from "react";
import { ResourceUploadForm } from "./ResourceUploadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

export const AdminResourcesPage = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Unauthorized",
          description: "Please log in to access this page",
          variant: "destructive",
        });
        navigate("/student-login");
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        toast({
          title: "Unauthorized",
          description: "You don't have permission to access this page",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchResources();
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast({
        title: "Error",
        description: "Failed to verify admin status",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast({
        title: "Error",
        description: "Failed to load resources",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResource = async (id: string, filePath: string) => {
    try {
      setIsDeletingId(id);
      
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('educational_resources')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete record from database
      const { error: dbError } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Resource deleted successfully",
      });

      // Refresh resources list
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      });
    } finally {
      setIsDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-500">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Admin Resources Management</h1>
          <p className="text-gray-500">Upload and manage educational resources for students</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form Section */}
          <div className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Upload New Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <ResourceUploadForm onUploadSuccess={fetchResources} />
              </CardContent>
            </Card>
          </div>

          {/* Resources List Section */}
          <div className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Manage Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {resources.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No resources found</p>
                    ) : (
                      resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-primary/20 transition-colors"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                            <p className="text-sm text-gray-500">{resource.subject} - {resource.level}</p>
                            <p className="text-xs text-gray-400">
                              Uploaded: {new Date(resource.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteResource(resource.id, resource.file_path)}
                            disabled={isDeletingId === resource.id}
                          >
                            {isDeletingId === resource.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};