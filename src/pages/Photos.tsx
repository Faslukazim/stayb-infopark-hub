import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Settings, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import RevealSection from "@/components/landing/RevealSection";
import PhotoGrid from "@/components/photos/PhotoGrid";
import PhotoUploader from "@/components/photos/PhotoUploader";
import { usePhotos } from "@/hooks/usePhotos";

const Photos = () => {
  const phoneNumber = "9633310117";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in StayB hostel near Infopark.`;
  const [isEditing, setIsEditing] = useState(false);
  
  const { 
    photos, 
    loading, 
    uploading, 
    uploadPhoto, 
    deletePhoto, 
    reorderPhotos, 
    replacePhoto,
    maxPhotos,
    canUpload 
  } = usePhotos();

  const handleUpload = async (file: File, aspectRatio: '1:1' | '4:5') => {
    await uploadPhoto(file, aspectRatio);
  };

  const handleReplace = async (id: string, file: File, aspectRatio: '1:1' | '4:5') => {
    await replacePhoto(id, file, aspectRatio);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="container-wide flex items-center justify-between">
          <RevealSection delay={0} duration={800}>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </RevealSection>

          <RevealSection delay={100} duration={800}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  Done
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4" />
                  Manage
                </>
              )}
            </button>
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
          {isEditing && (
            <RevealSection delay={300} duration={800}>
              <p className="text-muted-foreground mt-4">
                {photos.length} of {maxPhotos} photos • Drag to reorder
              </p>
            </RevealSection>
          )}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-32 md:pb-40">
        <div className="container-full">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-8">
              <PhotoGrid
                photos={photos}
                onDelete={deletePhoto}
                onReorder={reorderPhotos}
                onReplace={handleReplace}
                isEditing={isEditing}
              />

              {/* Upload Section (only in edit mode) */}
              {isEditing && canUpload && (
                <RevealSection delay={0} duration={600}>
                  <div className="max-w-sm">
                    {uploading && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </div>
                    )}
                    <PhotoUploader
                      onUpload={handleUpload}
                      disabled={uploading}
                      remainingSlots={maxPhotos - photos.length}
                    />
                  </div>
                </RevealSection>
              )}
            </div>
          )}
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
