import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Tell crawlers not to index this page
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);

    const prevTitle = document.title;
    document.title = "Page not found · StayB";

    console.warn("404:", location.pathname);

    return () => {
      document.head.removeChild(robots);
      document.title = prevTitle;
    };
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="overline mb-6 text-muted-foreground">Error 404</p>
        <h1 className="mb-5 text-foreground">Page not found</h1>
        <p className="body-lg text-muted-foreground mb-10">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Back to StayB
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
