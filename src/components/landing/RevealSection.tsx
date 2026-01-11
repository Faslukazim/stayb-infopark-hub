import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  duration?: number;
}

const RevealSection = ({ 
  children, 
  className, 
  delay = 0,
  direction = "up",
  duration = 900
}: RevealSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  const directionStyles = {
    up: "translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    fade: "translate-y-0"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out-expo",
        isVisible 
          ? "opacity-100 translate-x-0 translate-y-0" 
          : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

export default RevealSection;
