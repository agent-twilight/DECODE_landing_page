import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How accurate is your analysis?",
      answer: "Our analysis is based on peer-reviewed scientific literature and authoritative databases like PubChem, CIR, EU CosIng, and ECHA. We regularly update our models with the latest dermatology research to ensure accuracy.",
    },
    {
      question: "What sources do you use for ingredient safety?",
      answer: "We reference multiple authoritative sources including the Cosmetic Ingredient Review (CIR) expert panel assessments, European Chemicals Agency (ECHA) safety data, EU CosIng database, and peer-reviewed dermatology journals.",
    },
    {
      question: "Can your analysis replace professional dermatological advice?",
      answer: "No, our tool is designed to provide evidence-based information to help you make informed decisions. It should not replace professional medical or dermatological advice. Always consult with healthcare professionals for specific skin conditions or concerns.",
    },
    {
      question: "When will the app be available?",
      answer: "We're currently in beta testing phase with selected users. Join our waitlist to be notified when we launch publicly. Beta testers will get lifetime free access to premium features.",
    },
    {
      question: "How do you verify marketing claims?",
      answer: "We cross-reference marketing claims with scientific evidence from clinical studies and regulatory guidelines. Our AI identifies when claims are supported by research versus when they're marketing hyperbole.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-gray-600">
            Learn more about our scientific methodology and data sources.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                {openFAQ === index ? (
                  <ChevronUp className="text-gray-400 h-5 w-5" />
                ) : (
                  <ChevronDown className="text-gray-400 h-5 w-5" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
