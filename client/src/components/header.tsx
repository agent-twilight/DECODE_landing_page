import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-research-blue-900">SkincareAI</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-gray-600 hover:text-research-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('sources')} 
                className="text-gray-600 hover:text-research-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Our Sources
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-gray-600 hover:text-research-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                FAQ
              </button>
              <Button 
                onClick={() => scrollToSection('signup')} 
                className="bg-research-blue-600 text-white hover:bg-research-blue-700"
              >
                Join Waitlist
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-research-blue-600 transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('sources')} 
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-research-blue-600 transition-colors"
              >
                Our Sources
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-research-blue-600 transition-colors"
              >
                FAQ
              </button>
              <Button 
                onClick={() => scrollToSection('signup')} 
                className="w-full mt-2 bg-research-blue-600 text-white hover:bg-research-blue-700"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
