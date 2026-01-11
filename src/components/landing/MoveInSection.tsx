import { useState } from "react";
import RevealSection from "./RevealSection";

const MoveInSection = () => {
  const [selected, setSelected] = useState("Today");
  const options = ["Today", "1–7 Days", "Next Month"];

  return (
    <section className="section-tight">
      <div className="container-editorial">
        <RevealSection>
          <p className="overline mb-6">Move-In Window</p>
        </RevealSection>
        <RevealSection delay={80}>
          <h2 className="mb-12 text-foreground">When are you moving?</h2>
        </RevealSection>
        
        <RevealSection delay={160}>
          <div className="flex flex-wrap gap-4">
            {options.map((option, i) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`px-7 py-4 rounded-2xl text-[0.9375rem] font-medium transition-all duration-500 ease-out-expo ${
                  selected === option 
                    ? "bg-foreground text-background shadow-md" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {option}
              </button>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

export default MoveInSection;