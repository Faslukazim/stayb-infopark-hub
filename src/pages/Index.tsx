import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FriendsSection from "@/components/landing/FriendsSection";
import DistanceSection from "@/components/landing/DistanceSection";
import PricingSection from "@/components/landing/PricingSection";
import MoveInSection from "@/components/landing/MoveInSection";
import ParentSection from "@/components/landing/ParentSection";
import RoutineSection from "@/components/landing/RoutineSection";
import Footer from "@/components/landing/Footer";
import MobileCTABar from "@/components/landing/MobileCTABar";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

const Index = () => {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <FriendsSection />
      <DistanceSection />
      <PricingSection />
      <MoveInSection />
      <ParentSection />
      <RoutineSection />
      <Footer />
      <MobileCTABar />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
