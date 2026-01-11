import { useState } from "react";
import RevealSection from "./RevealSection";

const MoveInSection = () => {
  const [selected, setSelected] = useState("Today");
  const options = ["Today", "1–7 Days", "Next Month"];

  return (
    <section className="section-tight">
      <div className="container-editorial">
        <RevealSection>
          <p className="overline mb-4">Move-In Window</p>
        </RevealSection>
        <RevealSection delay={100}>
          <h2 className="mb-10 text-foreground">When are you moving?</h2>
        </RevealSection>
        
        <RevealSection delay={200}>
          <div className="flex flex-wrap gap-3">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`px-6 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 ease-out-expo ${
                  selected === option 
                    ? "bg-foreground text-background shadow-md" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
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
