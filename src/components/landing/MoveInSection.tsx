const MoveInSection = () => {
  const options = [
    { label: "Today", active: true },
    { label: "1–7 Days", active: false },
    { label: "Next Month", active: false },
  ];

  return (
    <section className="section-tight border-t border-border">
      <div className="container-editorial">
        <h2 className="mb-8">Move-In This Week.</h2>
        
        <div className="flex flex-wrap gap-3">
          {options.map((option) => (
            <button
              key={option.label}
              className={`px-5 py-3 rounded-lg border transition-all duration-200 text-base ${
                option.active 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-transparent border-border hover:border-foreground/30 hover:bg-muted/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoveInSection;
