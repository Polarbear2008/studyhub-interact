import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface ResourceUploadFormProps {
  onUploadSuccess?: () => void;
}

export const ResourceUploadForm = ({ onUploadSuccess }: ResourceUploadFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [examBoard, setExamBoard] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to upload resources",
          variant: "destructive",
        });
        return;
      }

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('educational_resources')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create resource record in the database
      const { error: dbError } = await supabase
        .from('resources')
        .insert({
          title,
          description,
          resource_type: resourceType,
          subject,
          level,
          exam_board: examBoard,
          file_path: filePath,
          content_type: file.type,
          created_by: session.user.id
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Resource uploaded successfully",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setResourceType("");
      setSubject("");
      setLevel("");
      setExamBoard("");
      setFile(null);

      // Call the success callback if provided
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload resource",
        variant: "destructive",
      });
      console.error("Error uploading resource:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="resourceType">Resource Type</Label>
          <Select value={resourceType} onValueChange={setResourceType} required>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="past_paper">Past Paper</SelectItem>
              <SelectItem value="worksheet">Worksheet</SelectItem>
              <SelectItem value="note">Note</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={subject} onValueChange={setSubject} required>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select value={level} onValueChange={setLevel} required>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A-Level">A Level</SelectItem>
              <SelectItem value="AS-Level">AS Level</SelectItem>
              <SelectItem value="IGCSE">IGCSE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="examBoard">Exam Board</Label>
          <Select value={examBoard} onValueChange={setExamBoard} required>
            <SelectTrigger>
              <SelectValue placeholder="Select exam board" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AQA">AQA</SelectItem>
              <SelectItem value="CIE">CIE</SelectItem>
              <SelectItem value="Edexcel">Edexcel</SelectItem>
              <SelectItem value="OCR">OCR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="cursor-pointer"
        />
      </div>

      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? (
          "Uploading..."
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resource
          </>
        )}
      </Button>
    </form>
  );
};