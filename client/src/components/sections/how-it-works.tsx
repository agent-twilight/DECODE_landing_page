import { CheckCircle, AlertTriangle, X } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Enter Product Information",
      description: "Input the product name, ingredient list, and marketing claims you want to verify.",
      color: "bg-research-blue-600",
    },
    {
      number: 2,
      title: "AI Scientific Analysis",
      description: "Our AI cross-references ingredients against peer-reviewed research and regulatory databases.",
      color: "bg-research-blue-600",
    },
    {
      number: 3,
      title: "Evidence-Based Report",
      description: "Get a detailed table with ingredient functions, safety profiles, and effectiveness backed by scientific sources.",
      color: "bg-research-green-600",
    },
  ];

  const sampleResults = [
    {
      ingredient: "Aqua (Water)",
      function: "Solvent",
      safety: { status: "Safe", icon: CheckCircle, color: "text-research-green-600" },
      effectiveness: { status: "Proven", icon: CheckCircle, color: "text-research-green-600" },
    },
    {
      ingredient: "Glycolic Acid",
      function: "Exfoliant", // Corrected
      safety: { status: "Safe", icon: CheckCircle, color: "text-research-green-600" },
      effectiveness: { status: "Proven", icon: CheckCircle, color: "text-research-green-600" },
    },
    {
      ingredient: "Rosa Damascena Flower Water",
      function: "Skin Conditioning / Fragrance", // Corrected
      safety: { status: "Caution", icon: AlertTriangle, color: "text-yellow-600" },
      effectiveness: { status: "Good", icon: CheckCircle, color: "text-blue-600" }, // Corrected
    },
    {
      ingredient: "Centaurea Cyanus Flower Water",
      function: "Skin Conditioning / Soothing", // Corrected
      safety: { status: "Caution", icon: AlertTriangle, color: "text-yellow-600" }, // Corrected
      effectiveness: { status: "Good", icon: CheckCircle, color: "text-blue-600" }, // Corrected
    },
    {
      ingredient: "Aspartic Acid",
      function: "Skin Conditioning",
      safety: { status: "Safe", icon: CheckCircle, color: "text-research-green-600" }, // Corrected
      effectiveness: { status: "Good", icon: CheckCircle, color: "text-blue-600" }, // Corrected
    },
    {
      ingredient: "1,2-Hexanediol",
      function: "Solvent / Humectant", // Corrected
      safety: { status: "Safe", icon: CheckCircle, color: "text-research-green-600" }, // Corrected
      effectiveness: { status: "Proven", icon: CheckCircle, color: "text-research-green-600" }, // Corrected
    },
    {
      ingredient: "Phenylalanine",
      function: "Skin Conditioning", // Corrected
      safety: { status: "Safe", icon: CheckCircle, color: "text-research-green-600" }, // Corrected
      effectiveness: { status: "Good", icon: CheckCircle, color: "text-blue-600" }, // Corrected
    },


  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Simple input, comprehensive scientific analysis. See how we analyze viral TikTok skincare products.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {step.number}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
            {/* Demo Results Preview */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample Analysis Results</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-600 font-medium">Ingredient</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Function</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Safety</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Effectiveness</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleResults.map((result, index) => {
                      const SafetyIcon = result.safety.icon;
                      const EffectivenessIcon = result.effectiveness.icon;

                      return (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 text-gray-900">{result.ingredient}</td>
                          <td className="py-2 text-gray-600">{result.function}</td>
                          <td className="py-2">
                            <span className={`${result.safety.color} font-medium flex items-center`}>
                              <SafetyIcon className="mr-1 h-3 w-3" />
                              {result.safety.status}
                            </span>
                          </td>
                          <td className="py-2">
                            <span className={`${result.effectiveness.color} font-medium flex items-center`}>
                              <EffectivenessIcon className="mr-1 h-3 w-3" />
                              {result.effectiveness.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <img 
              src="https://images.pexels.com/photos/27639443/pexels-photo-27639443.jpeg" 
              alt="Scientist analyzing cosmetic ingredients in modern laboratory" 
              className="rounded-2xl shadow-xl w-full h-auto" 
            />

          </div>
        </div>
      </div>
    </section>
  );
}
