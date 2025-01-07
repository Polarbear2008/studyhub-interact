import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResourceRatingProps {
  resourceId: string;
  initialRating?: number;
  onRatingSubmit?: (rating: number) => void;
}

export const ResourceRating = ({ resourceId, initialRating = 0, onRatingSubmit }: ResourceRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleRating = async (selectedRating: number) => {
    try {
      const { error } = await supabase
        .from('resource_ratings')
        .upsert({
          resource_id: resourceId,
          rating: selectedRating,
        }, {
          onConflict: 'resource_id,user_id'
        });

      if (error) throw error;

      setRating(selectedRating);
      onRatingSubmit?.(selectedRating);

      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          className="p-0 w-8 h-8"
          onMouseEnter={() => setHoveredRating(value)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleRating(value)}
        >
          <Star
            className={`h-5 w-5 ${
              value <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </Button>
      ))}
    </div>
  );
};