import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RevealSection from "./RevealSection";

const Footer = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <footer className="section bg-foreground text-background">
      <div className="container-editorial text-center">
        <RevealSection delay={0} duration={1000}>
          <p className="overline mb-5 text-background/50">Ready?</p>
        </RevealSection>
        <RevealSection delay={120} duration={1000}>
          <h2 className="mb-8 text-background">Check Availability</h2>
        </RevealSection>
        <RevealSection delay={240} duration={1000}>
          <p className="body-lg text-background/60 mb-16 max-w-md mx-auto">
            Beds fill fast during joining season. Reach out now to secure your spot.
          </p>
        </RevealSection>
        
        {/* Primary CTAs */}
        <RevealSection delay={360} duration={1000}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 transition-all duration-500"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-background/20 text-background hover:bg-background/10 transition-all duration-500"
              asChild
            >
              <a href={`tel:+91${phoneNumber}`}>
                Call {phoneNumber}
              </a>
            </Button>
          </div>
        </RevealSection>

        <RevealSection delay={480} duration={1000}>
          <div className="divider mx-auto mb-12 bg-background/15" />
        </RevealSection>

        <RevealSection delay={600} duration={1000}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link 
              to="/photos" 
              className="text-sm text-background/50 hover:text-background/80 transition-colors duration-500"
            >
              Photos →
            </Link>
            <p className="caption text-background/40">
              stayb.in
            </p>
          </div>
        </RevealSection>
      </div>
    </footer>
  );
};

export default Footer;
