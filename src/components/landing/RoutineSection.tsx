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
          <p className="overline mb-6">Daily Life</p>
        </RevealSection>
        <RevealSection delay={80}>
          <h2 className="mb-6 text-foreground">Zero Daily Headache.</h2>
        </RevealSection>
        <RevealSection delay={140}>
          <p className="body-large mb-14 max-w-md">
            Everything you need is handled. Focus on work, not logistics.
          </p>
        </RevealSection>
        
        <RevealSection delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {items.map((item, i) => (
              <div 
                key={item.label}
                className="bg-secondary/40 rounded-2xl p-7 text-center transition-all duration-500 ease-out-expo hover:bg-secondary/60"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <p className="text-foreground font-medium mb-2">{item.label}</p>
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