import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Import photos
import room1 from "@/assets/photos/room-1.jpg";
import room2 from "@/assets/photos/room-2.jpg";
import common1 from "@/assets/photos/common-1.jpg";
import corridor1 from "@/assets/photos/corridor-1.jpg";
import bathroom1 from "@/assets/photos/bathroom-1.jpg";
import dining1 from "@/assets/photos/dining-1.jpg";
import exterior1 from "@/assets/photos/exterior-1.jpg";
import workspace1 from "@/assets/photos/workspace-1.jpg";

const photos = [
  { src: room1, aspect: "landscape" },
  { src: common1, aspect: "landscape" },
  { src: corridor1, aspect: "portrait" },
  { src: room2, aspect: "landscape" },
  { src: bathroom1, aspect: "landscape" },
  { src: dining1, aspect: "landscape" },
  { src: exterior1, aspect: "portrait" },
  { src: workspace1, aspect: "landscape" },
];

const Photos = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I saw the photos and I'm interested in StayB hostel near Infopark.`;

  return (
    <main className="min-h-screen pb-32">
      {/* Header */}
      <header className="section-hero pb-0">
        <div className="container-wide">
          <Link 
            to="/" 
            className="link-editorial text-sm mb-12 inline-flex opacity-0 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
          
          <p 
            className="overline mb-6 opacity-0 animate-fade-up" 
            style={{ animationDelay: "50ms" }}
          >
            StayB · Kochi
          </p>
          <h1 
            className="text-foreground max-w-lg opacity-0 animate-fade-up" 
            style={{ animationDelay: "100ms" }}
          >
            Photos
          </h1>
        </div>
      </header>

      {/* Photo Grid */}
      <section className="section-tight pt-16 md:pt-20">
        <div className="container-wide">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {photos.map((photo, i) => (
              <div 
                key={i}
                className="break-inside-avoid opacity-0 animate-fade-up"
                style={{ animationDelay: `${200 + i * 60}ms` }}
              >
                <img 
                  src={photo.src} 
                  alt=""
                  className="w-full rounded-xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight">
        <div className="container-editorial text-center">
          <p 
            className="overline mb-6 opacity-0 animate-fade-up" 
            style={{ animationDelay: "700ms" }}
          >
            Interested?
          </p>
          <h2 
            className="mb-8 text-foreground opacity-0 animate-fade-up" 
            style={{ animationDelay: "750ms" }}
          >
            Check Availability
          </h2>
          <p 
            className="body-large mb-12 max-w-md mx-auto opacity-0 animate-fade-up" 
            style={{ animationDelay: "800ms" }}
          >
            Beds fill fast during joining season.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-up" 
            style={{ animationDelay: "850ms" }}
          >
            <Button variant="hero" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="hero-outline" asChild>
              <a href={`tel:+91${phoneNumber}`}>
                Call {phoneNumber}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Photos;