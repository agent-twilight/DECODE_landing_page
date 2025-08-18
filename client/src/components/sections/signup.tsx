import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { List, FlaskConical } from "lucide-react";

export default function Signup() {
  const { toast } = useToast();
  const [waitlistForm, setWaitlistForm] = useState({ email: "", concerns: "" });
  const [betaForm, setBetaForm] = useState({ email: "", background: "", experience: "" });

  const waitlistMutation = useMutation({
    mutationFn: (data: { email: string; concerns?: string }) =>
      apiRequest("POST", "/api/waitlist", data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for joining our waitlist! We'll notify you when we launch.",
      });
      setWaitlistForm({ email: "", concerns: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const betaMutation = useMutation({
    mutationFn: (data: { email: string; background?: string; experience: string }) =>
      apiRequest("POST", "/api/beta", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying to be a beta tester! We'll review your application and get back to you soon.",
      });
      setBetaForm({ email: "", background: "", experience: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit beta application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistForm.email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    waitlistMutation.mutate(waitlistForm);
  };

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!betaForm.email || !betaForm.experience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    betaMutation.mutate(betaForm);
  };

  return (
    <section id="signup" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Get Early Access</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of skincare enthusiasts who want science-backed product analysis.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Waitlist Signup */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-research-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <List className="text-research-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Join Waitlist</h3>
              <p className="mt-2 text-gray-600">Be the first to know when we launch and get exclusive early access.</p>
            </div>
            
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <Label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="waitlist-email"
                  value={waitlistForm.email}
                  onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                  required
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="skincare-concerns" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Skincare Concerns
                </Label>
                <Select value={waitlistForm.concerns} onValueChange={(value) => setWaitlistForm({ ...waitlistForm, concerns: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your main concern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anti-aging">Anti-aging</SelectItem>
                    <SelectItem value="acne">Acne Treatment</SelectItem>
                    <SelectItem value="sensitive-skin">Sensitive Skin</SelectItem>
                    <SelectItem value="hyperpigmentation">Hyperpigmentation</SelectItem>
                    <SelectItem value="hydration">Hydration</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-research-blue-600 text-white hover:bg-research-blue-700"
                disabled={waitlistMutation.isPending}
              >
                {waitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </div>

          {/* Beta Tester Application */}
          <div className="mt-8 lg:mt-0 bg-research-green-50 rounded-2xl p-8 border-2 border-research-green-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-research-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="text-research-green-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Beta Tester</h3>
              <p className="mt-2 text-gray-600">Help us improve the app and get free lifetime access as a beta tester.</p>
            </div>
            
            <form onSubmit={handleBetaSubmit} className="space-y-4">
              <div>
                <Label htmlFor="beta-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="beta-email"
                  value={betaForm.email}
                  onChange={(e) => setBetaForm({ ...betaForm, email: e.target.value })}
                  required
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="beta-background" className="block text-sm font-medium text-gray-700 mb-2">
                  Background
                </Label>
                <Select value={betaForm.background} onValueChange={(value) => setBetaForm({ ...betaForm, background: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skincare-enthusiast">Skincare Enthusiast</SelectItem>
                    <SelectItem value="beauty-professional">Beauty Professional</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="chemistry">Chemistry/Science</SelectItem>
                    <SelectItem value="content-creator">Content Creator</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="testing-experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to be a beta tester?
                </Label>
                <Textarea
                  id="testing-experience"
                  value={betaForm.experience}
                  onChange={(e) => setBetaForm({ ...betaForm, experience: e.target.value })}
                  rows={3}
                  required
                  placeholder="Tell us about your interest in evidence-based skincare analysis..."
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-research-green-600 text-white hover:bg-research-green-700"
                disabled={betaMutation.isPending}
              >
                {betaMutation.isPending ? "Submitting..." : "Apply for Beta"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
