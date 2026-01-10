import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import distanceAbstract from "@/assets/distance-abstract.png";

const DistanceSection = () => {
  const mapsLink = "https://maps.google.com/?q=StayB+Hostel+Infopark+Kochi";

  return (
    <section className="section-tight border-t border-border">
      <div className="container-editorial">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="mb-4">7 Minutes to Infopark Phase 2.</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              ₹0 commute. Parent-friendly. Predictable mornings.
            </p>
            <Button variant="outline" asChild>
              <a 
                href={mapsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Open in Maps
              </a>
            </Button>
          </div>
          <div>
            <img 
              src={distanceAbstract} 
              alt="Abstract location pin illustration" 
              className="w-full max-w-[180px] mx-auto rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistanceSection;
