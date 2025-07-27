import Hero from "../components/Hero";
import Services from "../components/Services";

const Home = () => {
  const services = [
    {
      id: 1,
      name: "Free Shipping",
      description: "Free Shipping on all orders",
    },
    {
      id: 2,
      name: "Customer Support 24/7",
      description: "Instant access to support",
    },
    {
      id: 3,
      name: "100% Secure Payment",
      description: "We ensure your money is safe",
    },
    {
      id: 4,
      name: "Money Back Guarantee",
      description: "30 Days Money Back Guarantee",
    },
  ];

  return (
    <main className="p-3 mb-5 flex flex-col items-center gap-12 pt-[45px]">
      <Hero />
      <Services services={services} />
    </main>
  );
};

export default Home;
