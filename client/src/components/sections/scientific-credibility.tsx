import { Database, Microscope, Scale, FlaskConical } from "lucide-react";

export default function ScientificCredibility() {
  const sources = [
    {
      icon: Database,
      title: "PubChem",
      description: "NIH's comprehensive chemical database with molecular properties and biological activities.",
      bgColor: "bg-research-blue-100",
      iconColor: "text-research-blue-600",
    },
    {
      icon: Microscope,
      title: "CIR Panel",
      description: "Cosmetic Ingredient Review expert panel safety assessments and scientific literature.",
      bgColor: "bg-research-green-100",
      iconColor: "text-research-green-600",
    },
    {
      icon: Scale,
      title: "EU CosIng",
      description: "European Commission's cosmetic ingredient database with regulatory information.",
      bgColor: "bg-research-blue-100",
      iconColor: "text-research-blue-600",
    },
    {
      icon: FlaskConical,
      title: "ECHA",
      description: "European Chemicals Agency data on chemical safety and regulatory compliance.",
      bgColor: "bg-research-green-100",
      iconColor: "text-research-green-600",
    },
  ];

  return (
    <section id="sources" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by Science</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our analysis is powered by authoritative databases and peer-reviewed research from leading scientific institutions.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sources.map((source, index) => {
            const IconComponent = source.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${source.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`${source.iconColor} h-8 w-8`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{source.title}</h3>
                <p className="text-gray-600 text-sm">{source.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
