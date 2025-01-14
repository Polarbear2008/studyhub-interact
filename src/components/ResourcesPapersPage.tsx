import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Loader2 } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PastPaperUploadForm } from "./PastPaperUploadForm";

interface PastPaper {
  id: string;
  title: string;
  subject: string;
  level: string;
  exam_board: string;
  year: number;
  season: string;
  paper_number: number;
  file_path: string;
}

export const ResourcesPapersPage = () => {
  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>("A-Level");
  const [selectedBoard, setSelectedBoard] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const examBoards = ["AQA", "CIE", "Edexcel", "OCR"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];
  const levels = ["A-Level", "AS-Level", "IGCSE"];

  useEffect(() => {
    checkAdminStatus();
    fetchPapers();
  }, [selectedLevel, selectedBoard, selectedSubject]);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .single();

        setIsAdmin(!!roles);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchPapers = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('past_papers')
        .select('*')
        .eq('level', selectedLevel);

      if (selectedBoard !== 'all') {
        query = query.eq('exam_board', selectedBoard);
      }
      if (selectedSubject !== 'all') {
        query = query.eq('subject', selectedSubject);
      }

      const { data, error } = await query
        .order('year', { ascending: false })
        .order('season')
        .order('paper_number');

      if (error) {
        console.error('Error fetching papers:', error);
        toast({
          title: "Error",
          description: "Failed to load past papers. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setPapers(data || []);
    } catch (error) {
      console.error('Error in fetchPapers:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadPaper = async (paper: PastPaper) => {
    try {
      const { data, error } = await supabase.storage
        .from('educational_resources')
        .download(paper.file_path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${paper.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading paper:', error);
      toast({
        title: "Error",
        description: "Failed to download paper. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-amber-50 to-orange-50">
      <BackButton />
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-900">Past Papers</h1>

      {isAdmin && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Past Paper</CardTitle>
          </CardHeader>
          <CardContent>
            <PastPaperUploadForm onUploadSuccess={fetchPapers} />
          </CardContent>
        </Card>
      )}

      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <select
          className="px-4 py-2 rounded-md border border-orange-200 bg-white"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 rounded-md border border-orange-200 bg-white"
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
        >
          <option value="all">All Exam Boards</option>
          {examBoards.map((board) => (
            <option key={board} value={board}>{board}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 rounded-md border border-orange-200 bg-white"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="all">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center text-gray-600">
          No papers found for the selected criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-orange-600 mt-1" />
                    <div>
                      <div className="text-lg font-semibold text-orange-900">
                        {paper.subject} - Paper {paper.paper_number}
                      </div>
                      <div className="text-sm text-orange-600">
                        {paper.exam_board} {paper.level}
                      </div>
                      <div className="text-xs text-gray-500">
                        {paper.season} {paper.year}
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => downloadPaper(paper)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};