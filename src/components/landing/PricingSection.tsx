import RevealSection from "./RevealSection";

const PricingSection = () => {
  const inclusions = ["Food", "WiFi", "Laundry", "Ironing", "₹0 commute"];

  return (
    <section className="section">
      <div className="container-editorial text-center">
        <RevealSection>
          <p className="overline mb-6">Transparent Pricing</p>
        </RevealSection>
        
        <RevealSection delay={80}>
          <h2 className="mb-6 text-foreground">₹7,000/month.</h2>
        </RevealSection>
        
        <RevealSection delay={140}>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-16 font-light">All-in.</p>
        </RevealSection>

        {/* Inclusion list */}
        <RevealSection delay={200}>
          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {inclusions.map((item, i) => (
              <span 
                key={item} 
                className="chip"
                style={{ animationDelay: `${220 + i * 40}ms` }}
              >
                {item}
              </span>
            ))}
          </div>
        </RevealSection>

        {/* Month 1 card */}
        <RevealSection delay={320}>
          <div className="card-elevated inline-block text-left max-w-sm mx-auto mb-14">
            <p className="overline mb-4">First Month</p>
            <p className="text-2xl md:text-3xl font-light text-foreground mb-3">₹8,000</p>
            <p className="caption">Includes deposit + admission</p>
          </div>
        </RevealSection>

        {/* Microcopy */}
        <RevealSection delay={400}>
          <p className="caption max-w-md mx-auto">
            No hidden mess bills. No WiFi add-ons. No commute surprises.
          </p>
        </RevealSection>
      </div>
    </section>
  );
};

export default PricingSection;