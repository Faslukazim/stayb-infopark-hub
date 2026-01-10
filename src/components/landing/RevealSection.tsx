import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  stagger?: number;
}

const RevealSection = ({ 
  children, 
  className, 
  delay = 0,
  direction = "up",
  stagger = 0
}: RevealSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  const directionStyles = {
    up: "translate-y-5",
    left: "translate-x-5",
    right: "-translate-x-5",
    fade: ""
  };

  const totalDelay = delay + stagger;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-800 ease-out-expo",
        isVisible 
          ? "opacity-100 translate-x-0 translate-y-0" 
          : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{ transitionDelay: `${totalDelay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealSection;