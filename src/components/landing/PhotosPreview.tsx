import { Link } from "react-router-dom";
import RevealSection from "./RevealSection";
import { usePhotos } from "@/hooks/usePhotos";

const PhotosPreview = () => {
  const { photos, loading } = usePhotos();
  const visible = photos.slice(0, 4);

  return (
    <section className="section-tight">
      <div className="container-wide">
        <RevealSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {loading || visible.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square w-full rounded-2xl bg-secondary animate-pulse"
                  />
                ))
              : visible.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square w-full overflow-hidden rounded-2xl bg-secondary"
                  >
                    <img
                      src={photo.url}
                      alt="StayB hostel interior"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
          </div>
        </RevealSection>

        <RevealSection delay={150}>
          <div className="mt-8 md:mt-10 text-center">
            <Link to="/photos" className="link-arrow">
              See all photos
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

export default PhotosPreview;
