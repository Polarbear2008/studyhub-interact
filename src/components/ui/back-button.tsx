import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="mb-4 hover:bg-gray-100"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
};