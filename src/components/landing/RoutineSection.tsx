import RevealSection from "./RevealSection";

const RoutineSection = () => {
  const items = [
    { label: "Meals", included: true },
    { label: "Laundry", included: true },
    { label: "WiFi", included: true },
    { label: "Ironing", included: true }
  ];

  return (
    <section className="section-tight">
      <div className="container-editorial">
        <RevealSection>
          <p className="overline mb-4">Daily Life</p>
        </RevealSection>
        <RevealSection delay={100}>
          <h2 className="mb-4 text-foreground">Zero Daily Headache.</h2>
        </RevealSection>
        <RevealSection delay={200}>
          <p className="text-lg mb-10 max-w-md">
            Everything you need is handled. Focus on work, not logistics.
          </p>
        </RevealSection>
        
        <RevealSection delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {items.map((item) => (
              <div 
                key={item.label}
                className="bg-secondary/50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-secondary"
              >
                <p className="text-foreground font-medium mb-1">{item.label}</p>
                <p className="caption text-xs">Included</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

export default RoutineSection;
