import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import geoShelter from "@/assets/geo-shelter.png";

const Hero = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <section className="min-h-[90vh] flex flex-col justify-center section-hero">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="max-w-xl">
            {/* Overline */}
            <p 
              className="overline mb-8 opacity-0 animate-fade-up" 
              style={{ animationDelay: "0ms" }}
            >
              Men's Hostel · Kochi
            </p>

            {/* Main headline */}
            <h1 
              className="mb-10 text-foreground opacity-0 animate-fade-up" 
              style={{ animationDelay: "100ms" }}
            >
              Walk to<br />Infopark.
            </h1>
            
            {/* Subheadline */}
            <p 
              className="body-large mb-14 max-w-md opacity-0 animate-fade-up" 
              style={{ animationDelay: "200ms" }}
            >
              7 minutes to your desk.<br className="hidden sm:block" /> Zero commute, zero headache.
            </p>

            {/* Feature list - refined */}
            <div 
              className="flex flex-wrap gap-3 mb-14 opacity-0 animate-fade-up" 
              style={{ animationDelay: "300ms" }}
            >
              {["Food included", "WiFi", "Laundry", "Ironing"].map((item, i) => (
                <span 
                  key={item} 
                  className="chip"
                  style={{ animationDelay: `${320 + i * 50}ms` }}
                >
                  {item}
                </span>
              ))}
              <span className="chip-accent">₹7000/mo</span>
            </div>

            {/* Primary CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-4 mb-10 opacity-0 animate-fade-up" 
              style={{ animationDelay: "450ms" }}
            >
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

            {/* Secondary links */}
            <div 
              className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-up" 
              style={{ animationDelay: "550ms" }}
            >
              <p className="caption">
                Or call{" "}
                <a 
                  href={`tel:+91${phoneNumber}`}
                  className="text-foreground hover:text-primary transition-colors duration-500 underline underline-offset-4"
                >
                  {phoneNumber}
                </a>
              </p>
              <Link 
                to="/photos" 
                className="link-editorial text-sm"
              >
                Photos
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Abstract illustration */}
          <div 
            className="hidden lg:flex items-center justify-center opacity-0 animate-fade-left" 
            style={{ animationDelay: "400ms" }}
          >
            <img 
              src={geoShelter} 
              alt="" 
              className="w-full max-w-md"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;