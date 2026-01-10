import friendsAbstract from "@/assets/friends-abstract.png";

const FriendsSection = () => {
  return (
    <section className="section-tight border-t border-border">
      <div className="container-editorial">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <img 
              src={friendsAbstract} 
              alt="Abstract friends illustration" 
              className="w-full max-w-xs mx-auto md:mx-0 rounded-xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-4">Move In Together.</h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-lg">
              2–4 friends can hold beds for 24h. No advance.
            </p>
            <p className="caption max-w-md">
              Avoid split decisions and roommate lottery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendsSection;
