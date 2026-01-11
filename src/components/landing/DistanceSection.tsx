import RevealSection from "./RevealSection";
import geoLocation from "@/assets/geo-location.png";

const DistanceSection = () => {
  return (
    <section className="section-tight">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Content */}
          <div className="max-w-md">
            <RevealSection>
              <p className="overline mb-6">Location</p>
            </RevealSection>
            <RevealSection delay={80}>
              <h2 className="mb-8 text-foreground">7-Minute Walk.</h2>
            </RevealSection>
            <RevealSection delay={160}>
              <p className="body-large mb-10">
                No autos. No buses. No Ola surge.<br />
                Walk to Infopark Phase 2 in under 10 minutes.
              </p>
            </RevealSection>
            <RevealSection delay={240}>
              <p className="caption">
                Save ₹2,000–3,000/month on commute costs alone.
              </p>
            </RevealSection>
          </div>

          {/* Image */}
          <RevealSection direction="left" delay={120}>
            <div className="flex justify-center lg:justify-end">
              <img 
                src={geoLocation} 
                alt="" 
                className="w-full max-w-xs lg:max-w-sm"
                aria-hidden="true"
              />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};

export default DistanceSection;