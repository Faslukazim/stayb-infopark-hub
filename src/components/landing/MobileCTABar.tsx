import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const MobileCTABar = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border/50 px-4 py-3">
      <div className="flex gap-3 max-w-md mx-auto">
        <Button variant="outline" size="lg" className="flex-1 rounded-xl" asChild>
          <a href={`tel:+91${phoneNumber}`}>
            <Phone className="w-4 h-4" />
            Call
          </a>
        </Button>
        <Button variant="default" size="lg" className="flex-1 rounded-xl" asChild>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MobileCTABar;
