import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Footer = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <footer className="section border-t border-border bg-card">
      <div className="container-editorial text-center">
        <h2 className="mb-8">Check Availability</h2>
        
        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button variant="hero" size="hero" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5" />
              Call/WhatsApp: {phoneNumber}
            </a>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button variant="hero-outline" size="hero" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Hold Beds 24h (No Advance)
            </a>
          </Button>
        </div>

        {/* Site link */}
        <p className="caption">
          stayb.in
        </p>
      </div>
    </footer>
  );
};

export default Footer;
