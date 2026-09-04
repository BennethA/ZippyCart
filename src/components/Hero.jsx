import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag, FiStar } from "react-icons/fi";
import Products from "../Products.json";

const Hero = () => {
  // Get real products from your existing product catalogue
  const womenProduct =
    Products.find(
      (product) =>
        product.gender === "Female" &&
        product.category === "Clothing" &&
        product.image_url
    ) || Products.find((product) => product.gender === "Female");

  const gownProduct =
    Products.find(
      (product) =>
        product.category === "Gown" && product.image_url
    ) || womenProduct;

  const shoeProduct =
    Products.find(
      (product) =>
        product.category === "Footwear" && product.image_url
    );

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="relative min-h-[560px] overflow-hidden rounded-[28px] bg-[#f4f1ed] dark:bg-[#171717] lg:min-h-[650px]">

          {/* Decorative circles */}
          <div className="absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-[#e8dfd5] dark:bg-white/5" />

          <div className="absolute -bottom-40 left-[35%] h-[450px] w-[450px] rounded-full border-[70px] border-white/40 dark:border-white/5" />

          <div className="relative z-10 grid min-h-[560px] grid-cols-1 items-center lg:min-h-[650px] lg:grid-cols-[0.9fr_1.1fr]">

            {/* LEFT CONTENT */}
            <div className="px-6 pb-8 pt-12 sm:px-10 lg:px-16 lg:py-16">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[2px] text-gray-700 backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-gray-200">
                <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
                New Season Collection
              </div>

              <h1 className="max-w-[650px] text-[44px] font-black leading-[0.98] tracking-[-2px] text-[#111] sm:text-[58px] lg:text-[72px] dark:text-white">
                WEAR YOUR
                <br />
                <span className="text-[#2563eb]">STYLE</span>
                <br />
                WITH CONFIDENCE.
              </h1>

              <p className="mt-7 max-w-[520px] text-[15px] leading-7 text-gray-600 sm:text-[16px] dark:text-gray-300">
                Discover pieces made to express you. Shop dresses,
                gowns, jeans, footwear and everyday essentials all in
                one place.
              </p>

              {/* BUTTONS */}
              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#111] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#2563eb] hover:shadow-xl hover:shadow-blue-500/20 dark:bg-white dark:text-black dark:hover:bg-[#2563eb] dark:hover:text-white"
                >
                  Shop Collection
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-6 py-3.5 text-sm font-bold text-[#111] backdrop-blur-sm transition-all duration-300 hover:border-[#2563eb] hover:text-[#2563eb] dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  <FiShoppingBag />
                  Explore Products
                </Link>

              </div>

              {/* TRUST INFO */}
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-gray-500 dark:text-gray-400">

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-white/10">
                    ✓
                  </span>
                  Quality products
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-white/10">
                    ✓
                  </span>
                  Secure shopping
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-white/10">
                    ✓
                  </span>
                  Easy returns
                </div>

              </div>

            </div>

            {/* RIGHT PRODUCT DISPLAY */}
            <div className="relative flex h-[430px] items-end justify-center px-6 sm:h-[500px] lg:h-full lg:px-8">

              {/* Main product image */}
              <div className="relative z-20 h-[360px] w-[250px] overflow-hidden rounded-t-[140px] rounded-b-[30px] bg-white shadow-2xl shadow-black/15 sm:h-[450px] sm:w-[310px] lg:h-[535px] lg:w-[365px]">

                {womenProduct?.image_url ? (
                  <img
                    src={womenProduct.image_url}
                    alt={womenProduct.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Fashion
                  </div>
                )}

                {/* Image gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-white/70">
                    Featured
                  </p>

                  <p className="mt-1 line-clamp-1 text-lg font-bold">
                    {womenProduct?.name || "Featured Fashion"}
                  </p>
                </div>

              </div>

              {/* Floating product card */}
              {gownProduct?.image_url && (
                <div className="absolute left-[3%] top-[18%] z-30 hidden w-[150px] rounded-2xl border border-white/70 bg-white/90 p-2 shadow-xl backdrop-blur-md sm:block dark:border-white/10 dark:bg-[#202020]/90">

                  <div className="h-[145px] overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={gownProduct.image_url}
                      alt={gownProduct.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  <div className="px-1 pb-1 pt-2">

                    <p className="line-clamp-1 text-xs font-bold text-gray-900 dark:text-white">
                      {gownProduct.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[10px] text-yellow-500">
                      <FiStar className="fill-current" />
                      {gownProduct.rating || "4.5"}
                    </div>

                  </div>

                </div>
              )}

              {/* Floating shoe card */}
              {shoeProduct?.image_url && (
                <div className="absolute bottom-[13%] right-[1%] z-30 hidden w-[165px] rounded-2xl border border-white/70 bg-white/90 p-2 shadow-xl backdrop-blur-md md:block dark:border-white/10 dark:bg-[#202020]/90">

                  <div className="h-[125px] overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={shoeProduct.image_url}
                      alt={shoeProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-1 pb-1 pt-2">

                    <p className="line-clamp-1 text-xs font-bold text-gray-900 dark:text-white">
                      {shoeProduct.name}
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#2563eb]">
                      GH₵ {shoeProduct.price?.toLocaleString()}
                    </p>

                  </div>

                </div>
              )}

              {/* Discount badge */}
              <div className="absolute right-[8%] top-[9%] z-40 flex h-[82px] w-[82px] rotate-6 items-center justify-center rounded-full bg-[#2563eb] text-center text-white shadow-xl shadow-blue-500/30">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider">
                    Up to
                  </p>
                  <p className="text-xl font-black">
                    30%
                  </p>
                  <p className="text-[9px] uppercase">
                    Off
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* MINI CATEGORY STRIP */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <Link
            to="/shop"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-lg dark:border-white/10 dark:bg-[#151515]"
          >
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-gray-400">
              Collection
            </p>

            <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">
              Dresses
            </h3>

            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb]">
              Shop now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/shop"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-lg dark:border-white/10 dark:bg-[#151515]"
          >
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-gray-400">
              Collection
            </p>

            <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">
              Gowns
            </h3>

            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb]">
              Shop now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/shop"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-lg dark:border-white/10 dark:bg-[#151515]"
          >
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-gray-400">
              Collection
            </p>

            <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">
              Jeans
            </h3>

            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb]">
              Shop now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/shop"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-lg dark:border-white/10 dark:bg-[#151515]"
          >
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-gray-400">
              Collection
            </p>

            <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">
              Footwear
            </h3>

            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb]">
              Shop now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;