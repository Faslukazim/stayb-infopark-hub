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
        <RevealSection>
          <p className="overline mb-6 text-background/50">Ready?</p>
        </RevealSection>
        <RevealSection delay={80}>
          <h2 className="mb-8 text-background">Check Availability</h2>
        </RevealSection>
        <RevealSection delay={160}>
          <p className="text-lg md:text-xl text-background/60 mb-14 max-w-md mx-auto font-light leading-relaxed">
            Beds fill fast during joining season. Reach out now to secure your spot.
          </p>
        </RevealSection>
        
        {/* Primary CTAs */}
        <RevealSection delay={240}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 rounded-xl px-8"
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
              className="border-background/20 text-background hover:bg-background/10 rounded-xl px-8"
              asChild
            >
              <a href={`tel:+91${phoneNumber}`}>
                Call {phoneNumber}
              </a>
            </Button>
          </div>
        </RevealSection>

        <RevealSection delay={320}>
          <div className="divider mx-auto mb-12 bg-background/15" />
        </RevealSection>

        <RevealSection delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <p className="caption text-background/40">
              stayb.in
            </p>
            <Link 
              to="/photos" 
              className="text-sm text-background/50 hover:text-background transition-colors duration-500 inline-flex items-center gap-1.5"
            >
              Photos
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </RevealSection>
      </div>
    </footer>
  );
};

export default Footer;