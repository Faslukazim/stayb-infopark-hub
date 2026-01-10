import Hero from "@/components/landing/Hero";
import FriendsSection from "@/components/landing/FriendsSection";
import DistanceSection from "@/components/landing/DistanceSection";
import PricingSection from "@/components/landing/PricingSection";
import MoveInSection from "@/components/landing/MoveInSection";
import ParentSection from "@/components/landing/ParentSection";
import RoutineSection from "@/components/landing/RoutineSection";
import Footer from "@/components/landing/Footer";
import MobileCTABar from "@/components/landing/MobileCTABar";

const Index = () => {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Hero />
      <FriendsSection />
      <DistanceSection />
      <PricingSection />
      <MoveInSection />
      <ParentSection />
      <RoutineSection />
      <Footer />
      <MobileCTABar />
    </main>
  );
};

export default Index;
