import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ResourceRating } from "./ResourceRating";
import { ResourceComments } from "./ResourceComments";
import { BackButton } from "@/components/ui/back-button";

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <h1 className="text-3xl font-bold mb-8">Study Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{resource.description}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {resource.subject}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {resource.level}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {resource.exam_board}
                  </span>
                </div>
                <ResourceRating resourceId={resource.id} />
                <button
                  onClick={() => setSelectedResource(selectedResource === resource.id ? null : resource.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {selectedResource === resource.id ? "Hide Comments" : "Show Comments"}
                </button>
                {selectedResource === resource.id && (
                  <ResourceComments resourceId={resource.id} />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};