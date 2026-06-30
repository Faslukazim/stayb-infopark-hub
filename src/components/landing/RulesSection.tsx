import RevealSection from "./RevealSection";

const RulesSection = () => {
  const rules = [
    { label: "Entry & Exit", detail: "No fixed curfew. Use your key." },
    { label: "Guests", detail: "Common areas only. No overnight guests." },
    { label: "Noise", detail: "Quiet hours after 11 PM." },
    { label: "Cleanliness", detail: "Rooms are yours. Common areas are shared." },
    {
      label: "Who lives here",
      detail: "Employees from TCS, Infosys, UST and other Infopark companies. Freshers and experienced — all professionals.",
    },
  ];

  return (
    <section className="section-tight">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="max-w-md">
            <RevealSection>
              <p className="overline mb-4">How We Live</p>
            </RevealSection>
            <RevealSection delay={100}>
              <h2 className="text-foreground">Simple Rules. No Surprises.</h2>
            </RevealSection>
          </div>

          <div className="space-y-6 max-w-md">
            {rules.map((rule, index) => (
              <RevealSection key={rule.label} delay={150 + index * 80}>
                <div className="group">
                  <p className="text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {rule.label}
                  </p>
                  <p className="caption">{rule.detail}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
