import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePhotos } from "@/hooks/usePhotos";

const Hero = () => {
  const { photos } = usePhotos();
  const heroPhoto = photos.find((p) => p.is_hero);
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          <div className="max-w-xl">
            <p className="overline mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0ms" }}>
              Operated by StayB Hostel
            </p>

            <h1 className="mb-10 text-foreground opacity-0 animate-fade-in" style={{ animationDelay: "120ms" }}>
              Walk to<br />Infopark.
            </h1>

            <p className="body-lg mb-14 opacity-0 animate-fade-in" style={{ animationDelay: "240ms" }}>
              7 minutes to your desk.<br className="hidden sm:block" /> Zero commute, zero headache.
            </p>

            <div className="flex flex-wrap gap-3 mb-14 opacity-0 animate-fade-in" style={{ animationDelay: "360ms" }}>
              {["Food included", "WiFi", "Laundry", "Ironing"].map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
              <span className="chip-accent">₹7000/mo</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "480ms" }}>
              <Button variant="hero" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Check Availability
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-6 opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
              <p className="caption">
                Or call{" "}
                <a
                  href={`tel:+91${phoneNumber}`}
                  className="text-foreground hover:text-primary transition-colors duration-500 underline underline-offset-4"
                >
                  {phoneNumber}
                </a>
              </p>
              <span className="text-border">·</span>
              <Link to="/photos" className="link-arrow">
                Photos
              </Link>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="opacity-0 animate-fade-in-slow" style={{ animationDelay: "300ms" }}>
            <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-3xl bg-secondary border border-dashed border-border flex items-center justify-center p-8">
              <p className="caption text-center text-muted-foreground leading-relaxed">
                REPLACE WITH:<br />
                real bedroom photo,<br />
                daytime, well-lit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
