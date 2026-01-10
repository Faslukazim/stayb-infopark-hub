const PricingSection = () => {
  const inclusions = [
    "Food",
    "WiFi",
    "Laundry",
    "Ironing",
    "₹0 commute"
  ];

  return (
    <section className="section border-t border-border">
      <div className="container-editorial">
        <h2 className="mb-4">₹7000/month. All-In.</h2>
        
        {/* Inclusion list */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
          {inclusions.map((item, index) => (
            <li 
              key={item} 
              className="text-lg text-muted-foreground"
            >
              {item}
              {index < inclusions.length - 1 && <span className="ml-6 text-border hidden sm:inline">·</span>}
            </li>
          ))}
        </ul>

        {/* Month 1 note */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 max-w-md">
          <p className="text-lg font-medium mb-1">Month 1: ₹8000</p>
          <p className="caption">Deposit + Admission Included</p>
        </div>

        {/* Microcopy */}
        <p className="caption max-w-md">
          No hidden mess bills. No WiFi add-ons. No commute surprises.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
