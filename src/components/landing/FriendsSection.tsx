import RevealSection from "./RevealSection";
import friendsMinimal from "@/assets/friends-minimal.png";

const FriendsSection = () => {
  return (
    <section className="section-tight">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <RevealSection direction="left" className="order-2 lg:order-1">
            <div className="flex justify-center lg:justify-start">
              <img 
                src={friendsMinimal} 
                alt="" 
                className="w-full max-w-xs lg:max-w-sm"
                aria-hidden="true"
              />
            </div>
          </RevealSection>

          {/* Content */}
          <div className="order-1 lg:order-2 max-w-md">
            <RevealSection>
              <p className="overline mb-4">For Groups</p>
            </RevealSection>
            <RevealSection delay={100}>
              <h2 className="mb-6 text-foreground">Move In Together.</h2>
            </RevealSection>
            <RevealSection delay={200}>
              <p className="text-lg mb-8">
                2–4 friends can hold beds for 24 hours. No advance payment required.
              </p>
            </RevealSection>
            <RevealSection delay={300}>
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
