import RevealSection from "./RevealSection";
import geoTrust from "@/assets/geo-trust.png";

const ParentSection = () => {
  return (
    <section className="section-tight">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Image */}
          <RevealSection direction="right" className="order-2 lg:order-1">
            <div className="flex justify-center lg:justify-start">
              <img 
                src={geoTrust} 
                alt="" 
                className="w-full max-w-xs lg:max-w-sm"
                aria-hidden="true"
              />
            </div>
          </RevealSection>

          {/* Content */}
          <div className="order-1 lg:order-2 max-w-md">
            <RevealSection>
              <p className="overline mb-6">For Parents</p>
            </RevealSection>
            <RevealSection delay={80}>
              <h2 className="mb-8 text-foreground">Safe. Supervised.</h2>
            </RevealSection>
            <RevealSection delay={160}>
              <p className="body-large mb-10">
                Your son is close to work, well-fed, and in a secure environment. No landlord drama.
              </p>
            </RevealSection>
            <RevealSection delay={240}>
              <p className="caption">
                Direct parent contact available anytime.
              </p>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentSection;