import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] flex flex-col gap-10 justify-center">
      <div>
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
          DISCOVER IT ALL, FROM CLOTHING TO JEWELLERY AND MORE.
        </h1>
      </div>
      <div>
        <p className="text-base md:text-lg text-gray-600 dark:text-[#c0c0c0] tracking-wide">
          ZippyCart is like having your favorite store in your pocket and on the
          internet. It brings the world of online shopping right to your
          fingertips, making it easier than ever to find and purchase the things
          you love.
        </p>
        <Link
          to="/shop"
          className="inline-block transition hover:opacity-80 rounded-md bg-gradient-to-r from-gray-900 to-gray-500 py-2 px-6 font-semibold text-white outline-none mt-4"
        >
          Start Shopping
        </Link>
      </div>
    </section>
  );
};

export default Hero;
