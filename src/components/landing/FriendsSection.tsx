import RevealSection from "./RevealSection";
import geoCommunity from "@/assets/geo-community.png";

const FriendsSection = () => {
  return (
    <section className="section-tight">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Image */}
          <RevealSection direction="right" className="order-2 lg:order-1">
            <div className="flex justify-center lg:justify-start">
              <img 
                src={geoCommunity} 
                alt="" 
                className="w-full max-w-xs lg:max-w-sm"
                aria-hidden="true"
              />
            </div>
          </RevealSection>

          {/* Content */}
          <div className="order-1 lg:order-2 max-w-md">
            <RevealSection>
              <p className="overline mb-6">For Groups</p>
            </RevealSection>
            <RevealSection delay={80}>
              <h2 className="mb-8 text-foreground">Move In Together.</h2>
            </RevealSection>
            <RevealSection delay={160}>
              <p className="body-large mb-10">
                2–4 friends can hold beds for 24 hours. No advance payment required.
              </p>
            </RevealSection>
            <RevealSection delay={240}>
              <p className="caption">
                Avoid split decisions and roommate lottery.
              </p>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendsSection;