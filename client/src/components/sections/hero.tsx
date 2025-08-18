import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Play } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-research-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="block">Evidence-Based</span>
                <span className="block text-research-blue-600">Skincare Analysis</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Stop guessing about your skincare products. Get scientific analysis of ingredients, safety, and effectiveness backed by peer-reviewed research and authoritative databases.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => scrollToSection('signup')}
                  size="lg"
                  className="bg-research-blue-600 text-white hover:bg-research-blue-700 shadow-lg px-8 py-4 text-lg font-semibold"
                >
                  Join Waitlist
                </Button>
                <Button 
                  onClick={() => scrollToSection('how-it-works')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-research-blue-600 text-research-blue-600 hover:bg-research-blue-50 px-8 py-4 text-lg font-semibold"
                >
                  <Play className="mr-2 h-4 w-4" />
                  View Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="text-research-green-500 mr-2 h-4 w-4" />
                  <span>Peer-reviewed sources</span>
                </div>
                <div className="flex items-center">
                  <Shield className="text-research-green-500 mr-2 h-4 w-4" />
                  <span>Scientific accuracy</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <img 
              src="https://images.unsplash.com/photo-1570194065650-d99fb4a7b2d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800" 
              alt="Professional skincare products on clean laboratory surface" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
