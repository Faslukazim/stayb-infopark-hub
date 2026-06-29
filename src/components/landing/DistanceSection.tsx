import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import RevealSection from "./RevealSection";
import locationMinimal from "@/assets/location-minimal.png";

const DistanceSection = () => {
  const mapsLink = "https://maps.google.com/?q=StayB+Hostel+Infopark+Kochi";

  return (
    <section className="section-tight">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="max-w-md">
            <RevealSection>
              <p className="overline mb-4">Location</p>
            </RevealSection>
            <RevealSection delay={100}>
              <h2 className="mb-6 text-foreground">7 Minutes to Infopark Phase 2.</h2>
            </RevealSection>
            <RevealSection delay={200}>
              <p className="text-lg mb-10">
                ₹0 commute. Parent-friendly address. Predictable mornings.
              </p>
            </RevealSection>
            <RevealSection delay={300}>
              <Button variant="outline" asChild>
                <a 
                  href={mapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Open in Maps
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </RevealSection>
          </div>

          {/* Image */}
          <RevealSection direction="right" className="flex justify-center lg:justify-end">
            <img 
              src={locationMinimal} 
              alt="" 
              className="w-32 md:w-40 lg:w-48"
              aria-hidden="true"
            />
          </RevealSection>
        </div>
      </div>
    </section>
  );
};

export default DistanceSection;
