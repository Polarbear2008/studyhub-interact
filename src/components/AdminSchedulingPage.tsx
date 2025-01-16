import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarClock, Clock, Loader2, Save } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export const AdminSchedulingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scheduledResources, setScheduledResources] = useState<any[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);
  const { toast } = useToast();

  const handleScheduleResource = async (resourceId: string, publishDate: Date) => {
    try {
      setIsScheduling(true);
      const { error } = await supabase
        .from('resources')
        .update({ 
          updated_at: new Date().toISOString(),
          scheduled_publish_date: publishDate.toISOString()
        })
        .eq('id', resourceId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resource scheduled successfully",
      });
    } catch (error) {
      console.error('Error scheduling resource:', error);
      toast({
        title: "Error",
        description: "Failed to schedule resource",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Content Scheduling</h1>
          <p className="text-gray-500">Schedule content releases and manage publication dates</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                Schedule Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border mx-auto"
                />
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Publish Time
                  </Label>
                  <Input
                    type="time"
                    className="w-full"
                  />
                </div>
                <Button className="w-full" disabled={isScheduling}>
                  {isScheduling ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isScheduling ? "Scheduling..." : "Save Schedule"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Scheduled Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {scheduledResources.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No content scheduled</p>
                  ) : (
                    scheduledResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-primary/20 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          <p className="text-sm text-gray-500">
                            Scheduled: {new Date(resource.scheduled_publish_date).toLocaleString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
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
  );
};