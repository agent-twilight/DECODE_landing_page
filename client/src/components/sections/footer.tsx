import { Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-research-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SkincareAI</h3>
            <p className="text-blue-200 max-w-md">
              Evidence-based skincare analysis powered by scientific research and authoritative databases. Make informed decisions about your skincare routine.
            </p>
            <div className="mt-6 flex space-x-4">
              {/* <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a> */}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-blue-200">
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('sources')} 
                  className="hover:text-white transition-colors"
                >
                  Our Sources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')} 
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('signup')} 
                  className="hover:text-white transition-colors"
                >
                  Beta Program
                </button>
              </li>
            </ul>
          </div>
          
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div> */}
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-800 text-center text-blue-200">
          <p>&copy; 2024 SkincareAI. All rights reserved. Built with scientific rigor and transparency.</p>
        </div>
      </div>
    </footer>
  );
}
