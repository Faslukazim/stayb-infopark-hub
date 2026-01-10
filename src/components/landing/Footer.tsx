import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RevealSection from "./RevealSection";

const Footer = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <footer className="section bg-foreground text-background">
      <div className="container-editorial text-center">
        <RevealSection>
          <p className="overline mb-4 text-background/60">Ready?</p>
        </RevealSection>
        <RevealSection delay={100}>
          <h2 className="mb-6 text-background">Check Availability</h2>
        </RevealSection>
        <RevealSection delay={200}>
          <p className="text-lg text-background/70 mb-12 max-w-md mx-auto">
            Beds fill fast during joining season. Reach out now to secure your spot.
          </p>
        </RevealSection>
        
        {/* Primary CTAs */}
        <RevealSection delay={300}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90"
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
              className="border-background/30 text-background hover:bg-background/10"
              asChild
            >
              <a href={`tel:+91${phoneNumber}`}>
                Call {phoneNumber}
              </a>
            </Button>
          </div>
        </RevealSection>

        <RevealSection delay={400}>
          <div className="divider mx-auto mb-10 bg-background/20" />
        </RevealSection>

        <RevealSection delay={500}>
          <p className="caption text-background/50">
            stayb.in
          </p>
        </RevealSection>
      </div>
    </footer>
  );
};

export default Footer;
