import RevealSection from "./RevealSection";
import shelterMinimal from "@/assets/shelter-minimal.png";

const ParentSection = () => {
  const points = [
    { label: "Walkable location", detail: "7 min to Infopark" },
    { label: "Refundable deposit", detail: "Fully returned on exit" },
    { label: "Inclusive food", detail: "All meals covered" },
    { label: "Clear rules", detail: "No surprises" }
  ];

  return (
    <section className="section-tight">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <RevealSection direction="left" className="order-2 lg:order-1">
            <div className="flex justify-center lg:justify-start">
              <img 
                src={shelterMinimal} 
                alt="" 
                className="w-48 md:w-56 lg:w-64"
                aria-hidden="true"
              />
            </div>
          </RevealSection>

          {/* Content */}
          <div className="order-1 lg:order-2 max-w-md">
            <RevealSection>
              <p className="overline mb-4">For Parents</p>
            </RevealSection>
            <RevealSection delay={100}>
              <h2 className="mb-10 text-foreground">Safe and Predictable.</h2>
            </RevealSection>
            
            <div className="space-y-6">
              {points.map((point, index) => (
                <RevealSection key={point.label} delay={200 + index * 100}>
                  <div className="group">
                    <p className="text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {point.label}
                    </p>
                    <p className="caption">{point.detail}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentSection;
