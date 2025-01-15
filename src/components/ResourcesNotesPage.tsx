import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download } from "lucide-react";
import { ResourceRating } from "./ResourceRating";
import { ResourceComments } from "./ResourceComments";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";

interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  exam_board: string;
  file_path: string;
}

export const ResourcesNotesPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('category', 'notes')
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

  const downloadResource = async (resource: Resource) => {
    try {
      const { data, error } = await supabase.storage
        .from('educational_resources')
        .download(resource.file_path);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.title;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Success",
        description: "File downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <BackButton />
      <h1 className="text-4xl font-bold mb-8 gradient-text">Study Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="glass-card card-hover">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{resource.description}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-gradient-primary text-white px-3 py-1 rounded-full">
                    {resource.subject}
                  </span>
                  <span className="bg-gradient-secondary text-white px-3 py-1 rounded-full">
                    {resource.level}
                  </span>
                  <span className="bg-gradient-accent text-white px-3 py-1 rounded-full">
                    {resource.exam_board}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 hover:bg-gradient-primary hover:text-white transition-all duration-300"
                  onClick={() => downloadResource(resource)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <ResourceRating resourceId={resource.id} />
                <button
                  onClick={() => setSelectedResource(selectedResource === resource.id ? null : resource.id)}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {selectedResource === resource.id ? "Hide Comments" : "Show Comments"}
                </button>
                {selectedResource === resource.id && (
                  <div className="animate-scale-in">
                    <ResourceComments resourceId={resource.id} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};