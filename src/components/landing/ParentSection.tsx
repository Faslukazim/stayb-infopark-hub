import { Check } from "lucide-react";
import parentAbstract from "@/assets/parent-abstract.png";

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
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <img 
              src={parentAbstract} 
              alt="Abstract shelter illustration" 
              className="w-full max-w-[200px] mx-auto md:mx-0 rounded-xl"
            />
          </div>
          <div className="order-1 md:order-2">
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
        </div>
      </div>
    </section>
  );
};

export default ParentSection;
