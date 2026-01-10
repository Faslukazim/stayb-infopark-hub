import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Hero = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <section className="section min-h-[90vh] flex flex-col justify-center">
      <div className="container-editorial">
        {/* Main headline */}
        <h1 className="mb-6 animate-fade-in">
          Walk to Infopark.
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
          7 minutes to your desk. Zero commute, zero headache.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="chip">Food included</span>
          <span className="chip">WiFi</span>
          <span className="chip">Laundry</span>
          <span className="chip">Ironing</span>
          <span className="chip-accent">₹7000/month (from Month 2)</span>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button variant="hero" size="hero" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Check Availability
            </a>
          </Button>
          <Button variant="hero-outline" size="hero" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Hold Beds for 24h (No Advance)
            </a>
          </Button>
        </div>

        {/* Secondary CTA */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <a 
            href={`tel:+91${phoneNumber}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call/WhatsApp: {phoneNumber}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
