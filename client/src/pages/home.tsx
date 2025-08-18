import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import ScientificCredibility from "@/components/sections/scientific-credibility";
import HowItWorks from "@/components/sections/how-it-works";
import Signup from "@/components/sections/signup";
import FAQ from "@/components/sections/faq";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen font-inter bg-gray-50 text-gray-900">
      <Header />
      <Hero />
      <ScientificCredibility />
      <HowItWorks />
      <Signup />
      <FAQ />
      <Footer />
    </div>
  );
}
