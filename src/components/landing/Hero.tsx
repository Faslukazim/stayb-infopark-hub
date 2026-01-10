import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroMinimal from "@/assets/hero-minimal.png";

const Hero = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-16 py-20">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="max-w-xl">
            {/* Overline */}
            <p className="overline mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0ms" }}>
              Men's Hostel · Kochi
            </p>

            {/* Main headline */}
            <h1 className="mb-8 text-foreground opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Walk to<br />Infopark.
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              7 minutes to your desk.<br className="hidden sm:block" /> Zero commute, zero headache.
            </p>

            {/* Feature list - refined */}
            <div className="flex flex-wrap gap-3 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              {["Food included", "WiFi", "Laundry", "Ironing"].map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
              <span className="chip-accent">₹7000/mo</span>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button variant="hero" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Check Availability
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="hero-outline" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Hold Beds 24h
                </a>
              </Button>
            </div>

            {/* Secondary CTA */}
            <p className="caption opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
              Or call{" "}
              <a 
                href={`tel:+91${phoneNumber}`}
                className="text-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                {phoneNumber}
              </a>
            </p>
          </div>

          {/* Abstract illustration */}
          <div className="hidden lg:flex items-center justify-center opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <img 
              src={heroMinimal} 
              alt="" 
              className="w-full max-w-lg rounded-3xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
