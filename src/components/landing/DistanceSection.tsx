import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const DistanceSection = () => {
  const mapsLink = "https://maps.google.com/?q=StayB+Hostel+Infopark+Kochi";

  return (
    <section className="section-tight border-t border-border">
      <div className="container-editorial">
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
    </section>
  );
};

export default DistanceSection;
