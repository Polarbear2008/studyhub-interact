import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Calculator, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ResourceUploadForm } from "./ResourceUploadForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const SubjectsPage = () => {
  const [resources, setResources] = useState<any[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

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

  const getIcon = (group: string) => {
    switch(group) {
      case "A Level":
        return <GraduationCap className="w-8 h-8 text-primary" />;
      case "AS Level":
        return <BookOpen className="w-8 h-8 text-secondary" />;
      case "IGCSE":
        return <Calculator className="w-8 h-8 text-accent" />;
      default:
        return null;
    }
  };

  useEffect(() => {
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

    fetchResources();
  }, [toast]);

  const downloadResource = async (resource: any) => {
    try {
      const { data, error } = await supabase.storage
        .from('educational_resources')
        .download(resource.file_path);

      if (error) throw error;

      // Create a download link
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.title;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resource:', error);
      toast({
        title: "Error",
        description: "Failed to download resource",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our Subjects
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Comprehensive courses designed to help you excel in your studies
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="mt-6">
                <Plus className="mr-2 h-4 w-4" />
                Upload Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload Educational Resource</DialogTitle>
              </DialogHeader>
              <ResourceUploadForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Subject Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(subjectGroups).map(([group, subjects]) => (
            <Card 
              key={group} 
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/50 backdrop-blur-sm border border-gray-100"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {getIcon(group)}
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {group}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {subjects.map((subject) => (
                    <li
                      key={subject}
                      className="p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer flex items-center group"
                    >
                      <span className="text-gray-700 group-hover:text-primary transition-colors">
                        {subject}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resources Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {resource.level}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {resource.subject}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {resource.exam_board}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => downloadResource(resource)}
                    className="w-full"
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};