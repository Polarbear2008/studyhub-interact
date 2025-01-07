import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarClock, Save } from "lucide-react";

export const AdminSchedulingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scheduledResources, setScheduledResources] = useState<any[]>([]);
  const { toast } = useToast();

  const handleScheduleResource = async (resourceId: string, publishDate: Date) => {
    try {
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Content Scheduling</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                Schedule Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="space-y-2">
                  <Label>Publish Time</Label>
                  <Input
                    type="time"
                    className="w-full"
                  />
                </div>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledResources.length === 0 ? (
                  <p className="text-gray-500">No content scheduled</p>
                ) : (
                  scheduledResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
                    >
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};