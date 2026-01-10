import { Check } from "lucide-react";

const ParentSection = () => {
  const points = [
    "Walkable location",
    "Refundable deposit",
    "Inclusive food",
    "Clear rules"
  ];

  return (
    <section className="section-tight border-t border-border">
      <div className="container-editorial">
        <h2 className="mb-8">Safe and Predictable.</h2>
        
        <ul className="space-y-4">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-lg">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ParentSection;
