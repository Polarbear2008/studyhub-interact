import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const SignupForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualifications: "",
    subjects: "",
    experience: "",
    bio: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    // Handle form submission
    toast({
      title: "Success",
      description: "Your application has been submitted successfully!",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="qualifications">Qualifications</Label>
          <Input
            id="qualifications"
            name="qualifications"
            required
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="e.g., PhD in Physics, MSc in Mathematics"
          />
        </div>

        <div>
          <Label htmlFor="subjects">Subjects You Can Teach</Label>
          <Input
            id="subjects"
            name="subjects"
            required
            value={formData.subjects}
            onChange={handleChange}
            placeholder="e.g., Mathematics, Physics, Chemistry"
          />
        </div>

        <div>
          <Label htmlFor="experience">Years of Teaching Experience</Label>
          <Input
            id="experience"
            name="experience"
            type="number"
            required
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="bio">About You</Label>
          <Textarea
            id="bio"
            name="bio"
            required
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about your teaching experience and approach"
            className="h-32"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Submit Application
      </Button>
    </form>
  );
};