import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import Products from "../Products.json";

const PromoSection = () => {
  const navigate = useNavigate();

  const promoProducts = useMemo(() => {
    const gown = Products.find(
      (item) =>
        item.category?.toLowerCase() === "gown" &&
        item.image_url
    );

    const clothing = Products.find(
      (item) =>
        item.category?.toLowerCase() === "clothing" &&
        item.image_url
    );

    const footwear = Products.find(
      (item) =>
        item.category?.toLowerCase() === "footwear" &&
        item.image_url
    );

    return {
      gown,
      clothing,
      footwear,
    };
  }, []);

  return (
    <section className="mx-auto mt-24 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">

      {/* Main Editorial Banner */}
      <div className="relative min-h-[480px] overflow-hidden rounded-[28px] bg-[#111111]">

        {/* Background Image */}
        {promoProducts.gown?.image_url && (
          <img
            src={promoProducts.gown.image_url}
            alt="Featured gown collection"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55 transition-transform duration-1000 hover:scale-[1.02]"
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[480px] items-center px-6 py-14 sm:px-10 lg:px-16">
          <div className="max-w-[560px]">

            <p className="text-[10px] font-bold uppercase tracking-[3px] text-white/60">
              The new fashion edit
            </p>

            <h2 className="mt-4 max-w-[500px] text-4xl font-black leading-[1.05] tracking-[-1.5px] text-white sm:text-5xl lg:text-6xl">
              Define your look.
              <br />
              Own your style.
            </h2>

            <p className="mt-5 max-w-[460px] text-sm leading-7 text-white/65 sm:text-base">
              From effortless everyday pieces to statement outfits,
              discover styles designed to make every moment yours.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-gray-900 transition-all duration-300 hover:bg-[#2563eb] hover:text-white"
            >
              Explore collection
              <FiArrowRight />
            </button>

          </div>
        </div>

        {/* Decorative Label */}
        <div className="absolute bottom-6 right-6 hidden sm:block">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/30 text-center backdrop-blur-sm">
            <span className="text-[9px] font-bold uppercase leading-4 tracking-[1.5px] text-white/80">
              New
              <br />
              Season
              <br />
              2026
            </span>
          </div>
        </div>

      </div>

      {/* Secondary Promotional Cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">

        {/* Sale Card */}
        <div className="group relative min-h-[360px] overflow-hidden rounded-[24px] bg-[#f2f2f2] dark:bg-[#181818]">

          {promoProducts.clothing?.image_url && (
            <img
              src={promoProducts.clothing.image_url}
              alt="Clothing collection"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

            <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[1.5px] text-gray-900">
              Limited offer
            </span>

            <h3 className="mt-4 text-3xl font-black tracking-[-1px] text-white">
              Up to 30% off
            </h3>

            <p className="mt-2 max-w-[360px] text-sm leading-6 text-white/65">
              Refresh your wardrobe with selected styles at special
              prices.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#60a5fa]"
            >
              Shop sale
              <FiArrowRight />
            </button>

          </div>
        </div>

        {/* Footwear Card */}
        <div className="group relative min-h-[360px] overflow-hidden rounded-[24px] bg-[#f2f2f2] dark:bg-[#181818]">

          {promoProducts.footwear?.image_url && (
            <img
              src={promoProducts.footwear.image_url}
              alt="Footwear collection"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

            <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[1.5px] text-gray-900">
              Complete the look
            </span>

            <h3 className="mt-4 text-3xl font-black tracking-[-1px] text-white">
              Step into style
            </h3>

            <p className="mt-2 max-w-[360px] text-sm leading-6 text-white/65">
              Find the perfect footwear to finish your favourite
              outfits.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/shop?category=Footwear")
              }
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#60a5fa]"
            >
              Shop footwear
              <FiArrowRight />
            </button>

          </div>
        </div>

      </div>

      {/* Small Trust Strip */}
      <div className="mt-4 grid grid-cols-2 divide-x divide-gray-200 rounded-[20px] border border-gray-100 bg-gray-50 px-4 py-5 dark:divide-white/10 dark:border-white/5 dark:bg-[#151515] sm:grid-cols-4">

        <div className="px-3 text-center sm:px-5">
          <p className="text-sm font-black text-gray-900 dark:text-white">
            100%
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[1px] text-gray-400">
            Quality styles
          </p>
        </div>

        <div className="px-3 text-center sm:px-5">
          <p className="text-sm font-black text-gray-900 dark:text-white">
            Easy
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[1px] text-gray-400">
            Shopping
          </p>
        </div>

        <div className="mt-4 border-t border-gray-200 px-3 text-center dark:border-white/10 sm:mt-0 sm:border-t-0 sm:px-5">
          <p className="text-sm font-black text-gray-900 dark:text-white">
            Fast
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[1px] text-gray-400">
            Delivery
          </p>
        </div>

        <div className="mt-4 border-t border-gray-200 px-3 text-center dark:border-white/10 sm:mt-0 sm:border-t-0 sm:px-5">
          <p className="text-sm font-black text-gray-900 dark:text-white">
            Secure
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[1px] text-gray-400">
            Payments
          </p>
        </div>

      </div>

    </section>
  );
};

export default PromoSection;
