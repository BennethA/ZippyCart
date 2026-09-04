import Hero from "../components/Hero";
import Services from "../components/Services";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoSection from "../components/PromoSection";

const Home = () => {
  const services = [
    {
      id: 1,
      name: "Easy Shopping",
      description: "Find your favourite styles without the hassle.",
    },
    {
      id: 2,
      name: "Fast Delivery",
      description: "Get your orders delivered quickly and conveniently.",
    },
    {
      id: 3,
      name: "Secure Payment",
      description: "Shop confidently with a secure checkout experience.",
    },
    {
      id: 4,
      name: "Easy Returns",
      description: "Shop with confidence with our simple return policy.",
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-16 pt-6 transition-colors duration-300 dark:bg-[#0d0d0d] sm:pt-8">
      <Hero />

      <CategorySection />

      <FeaturedProducts />

      <PromoSection />
      
      <Services services={services} />
    </main>
  );
};

export default Home;
