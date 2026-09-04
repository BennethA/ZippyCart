import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import Products from "../Products.json";

const CATEGORY_CONFIG = [
  {
    name: "Clothing",
    label: "Dresses & Clothing",
    description: "Everyday styles",
  },
  {
    name: "Gown",
    label: "Gowns",
    description: "Elegant occasions",
  },
  {
    name: "Jeans",
    label: "Jeans",
    description: "Classic denim",
  },
  {
    name: "Footwear",
    label: "Footwear",
    description: "Step into style",
  },
  {
    name: "Swimwear",
    label: "Swimwear",
    description: "Make a splash",
  },
  {
    name: "Pajamas",
    label: "Pajamas",
    description: "Comfort at home",
  },
  {
    name: "Winterwear",
    label: "Winterwear",
    description: "Warm & stylish",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = useMemo(() => {
    return CATEGORY_CONFIG.map((category) => {
      const product = Products.find(
        (item) =>
          item.category?.toLowerCase() === category.name.toLowerCase() &&
          item.image_url,
      );

      const productCount = Products.filter(
        (item) => item.category?.toLowerCase() === category.name.toLowerCase(),
      ).length;

      return {
        ...category,
        image: product?.image_url,
        count: productCount,
      };
    });
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="mx-auto mt-20 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADER */}
      <div className="mb-7 flex items-end justify-between gap-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#2563eb]">
            Explore our collection
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.8px] text-gray-900 sm:text-3xl dark:text-white">
            Shop by category
          </h2>

          <p className="mt-2 max-w-[560px] text-sm leading-6 text-gray-500 dark:text-gray-400">
            Find pieces that match your style, from everyday essentials to
            standout looks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="hidden shrink-0 items-center gap-2 text-sm font-bold text-gray-900 transition-colors hover:text-[#2563eb] sm:flex dark:text-white"
        >
          View all
          <FiArrowRight />
        </button>
      </div>

      {/* DESKTOP / TABLET GRID */}
      <div className="hidden grid-cols-2 gap-4 sm:grid lg:grid-cols-4">
        {categories.map((category, index) => (
          <button
            key={category.name}
            type="button"
            onClick={() => handleCategoryClick(category.name)}
            className={`group relative overflow-hidden rounded-[22px] bg-gray-100 text-left dark:bg-[#181818] ${
              index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            {/* IMAGE */}
            <div
              className={`relative overflow-hidden ${
                index === 0
                  ? "aspect-[4/4.8] lg:aspect-auto lg:h-full lg:min-h-[510px]"
                  : "aspect-[4/4.6]"
              }`}
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.label}
                  loading={index > 1 ? "lazy" : "eager"}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-gray-400">
                  {category.label}
                </div>
              )}

              {/* DARK GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[1.8px] text-white/65">
                      {category.description}
                    </p>

                    <h3
                      className={`font-bold text-white ${
                        index === 0 ? "text-2xl sm:text-3xl" : "text-lg"
                      }`}
                    >
                      {category.label}
                    </h3>

                    <p className="mt-1 text-xs text-white/65">
                      {category.count}{" "}
                      {category.count === 1 ? "product" : "products"}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:bg-[#2563eb] group-hover:text-white">
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>

              {/* TOP LABEL */}
              {index === 0 && (
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-900 backdrop-blur-sm">
                  Most loved
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* MOBILE HORIZONTAL SCROLL */}
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-3 sm:hidden">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => handleCategoryClick(category.name)}
            className="group relative w-[180px] shrink-0 overflow-hidden rounded-[20px] bg-gray-100 text-left dark:bg-[#181818]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.label}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  {category.label}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[1.4px] text-white/60">
                  {category.description}
                </p>

                <h3 className="mt-1 text-base font-bold text-white">
                  {category.label}
                </h3>

                <p className="mt-1 text-[10px] text-white/60">
                  {category.count} products
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* MOBILE VIEW ALL */}
      <button
        type="button"
        onClick={() => navigate("/shop")}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-3 text-sm font-bold text-gray-900 transition hover:border-[#2563eb] hover:text-[#2563eb] sm:hidden dark:border-white/10 dark:text-white"
      >
        View all categories
        <FiArrowRight />
      </button>
    </section>
  );
};

export default CategorySection;
