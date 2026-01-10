const RoutineSection = () => {
  const items = [
    "Meals included",
    "Laundry included", 
    "WiFi included"
  ];

  return (
    <section className="section-tight border-t border-border">
      <div className="container-editorial">
        <h2 className="mb-8">Zero Daily Headache.</h2>
        
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoutineSection;
