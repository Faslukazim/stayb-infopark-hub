import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import PhotosPreview from "@/components/landing/PhotosPreview";
import DistanceSection from "@/components/landing/DistanceSection";
import PricingSection from "@/components/landing/PricingSection";
import RulesSection from "@/components/landing/RulesSection";
import ParentSection from "@/components/landing/ParentSection";
import Footer from "@/components/landing/Footer";
import MobileCTABar from "@/components/landing/MobileCTABar";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <PhotosPreview />
      <PricingSection />
      <DistanceSection />
      <RulesSection />
      <ParentSection />
      <Footer />
      <MobileCTABar />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
