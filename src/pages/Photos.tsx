import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RevealSection from "@/components/landing/RevealSection";

// Placeholder images - replace with actual hostel photos
const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80", alt: "Room interior" },
  { id: 2, src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", alt: "Common area" },
  { id: 3, src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", alt: "Bedroom" },
  { id: 4, src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", alt: "Workspace" },
  { id: 5, src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", alt: "Kitchen" },
  { id: 6, src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80", alt: "Living space" },
  { id: 7, src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80", alt: "Bathroom" },
  { id: 8, src: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80", alt: "Exterior" },
];

const Photos = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="container-wide">
          <RevealSection delay={0} duration={800}>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </RevealSection>
        </div>
      </header>

      {/* Title */}
      <section className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="container-wide">
          <RevealSection delay={100} duration={1000}>
            <p className="overline mb-5">Verification</p>
          </RevealSection>
          <RevealSection delay={200} duration={1000}>
            <h1 className="max-w-2xl">Photos</h1>
          </RevealSection>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-32 md:pb-40">
        <div className="container-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {photos.map((photo, index) => (
              <RevealSection 
                key={photo.id} 
                delay={300 + index * 80} 
                duration={900}
                direction="fade"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-20 py-32 md:py-40 bg-foreground text-background">
        <div className="container-editorial text-center">
          <RevealSection delay={0} duration={1000}>
            <p className="overline mb-5 text-background/50">Interested?</p>
          </RevealSection>
          <RevealSection delay={120} duration={1000}>
            <h2 className="mb-8 text-background">Get in Touch</h2>
          </RevealSection>
          <RevealSection delay={240} duration={1000}>
            <p className="body-lg text-background/60 mb-16 max-w-md mx-auto">
              These photos are for verification. Visit or call to see everything in person.
            </p>
          </RevealSection>
          
          <RevealSection delay={360} duration={1000}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
        </div>
      </section>
    </main>
  );
};

export default Photos;