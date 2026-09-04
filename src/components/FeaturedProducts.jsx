import { useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

import Products from "../Products.json";
import DataContext from "../Context/DataContext";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const { cart, handleItem } = useContext(DataContext);

  const featuredProducts = useMemo(() => {
    const clothing = Products.filter(
      (item) =>
        item.category?.toLowerCase() === "clothing" &&
        item.image_url
    );

    const gowns = Products.filter(
      (item) =>
        item.category?.toLowerCase() === "gown" &&
        item.image_url
    );

    const jeans = Products.filter(
      (item) =>
        item.category?.toLowerCase() === "jeans" &&
        item.image_url
    );

    const footwear = Products.filter(
      (item) =>
        item.category?.toLowerCase() === "footwear" &&
        item.image_url
    );

    return [
      ...clothing.slice(0, 2),
      ...gowns.slice(0, 2),
      ...jeans.slice(0, 1),
      ...footwear.slice(0, 1),
    ].slice(0, 6);
  }, []);

  const isInCart = (product) => {
    return cart?.some((item) => item.id === product.id);
  };

  const getProductName = (product) => {
    return (
      product.title ||
      product.name ||
      product.product_name ||
      "Fashion Product"
    );
  };

  const getProductPrice = (product) => {
    const price =
      product.price ??
      product.product_price ??
      product.cost ??
      0;

    return Number(price);
  };

  const getProductCategory = (product) => {
    return product.category || "Fashion";
  };

  const handleProductClick = (product) => {
    navigate(`/product-information/${product.id}`);
  };

  return (
    <section className="mx-auto mt-24 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">

      {/* Section Heading */}
      <div className="mb-8 flex items-end justify-between gap-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#2563eb]">
            Curated for you
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.8px] text-gray-900 sm:text-3xl dark:text-white">
            Featured products
          </h2>

          <p className="mt-2 max-w-[560px] text-sm leading-6 text-gray-500 dark:text-gray-400">
            Discover some of our most stylish picks, selected to
            refresh your wardrobe and elevate your everyday look.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="hidden shrink-0 items-center gap-2 text-sm font-bold text-gray-900 transition-colors hover:text-[#2563eb] sm:flex dark:text-white"
        >
          View all products
          <FiArrowRight />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

        {featuredProducts.map((product, index) => {
          const productName = getProductName(product);
          const productPrice = getProductPrice(product);
          const category = getProductCategory(product);
          const addedToCart = isInCart(product);

          return (
            <article
              key={product.id || `${productName}-${index}`}
              className="group min-w-0"
            >

              {/* Product Image */}
              <div
                className="relative cursor-pointer overflow-hidden rounded-[18px] bg-gray-100 dark:bg-[#181818]"
                onClick={() => handleProductClick(product)}
              >

                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={productName}
                    loading={index > 1 ? "lazy" : "eager"}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Image Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* New Badge */}
                {index < 3 && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1.2px] text-gray-900 shadow-sm">
                    New
                  </span>
                )}

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label={`Add ${productName} to wishlist`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-800 opacity-100 shadow-sm transition-all duration-300 hover:bg-[#2563eb] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <FiHeart size={16} />
                </button>

                {/* Add To Cart */}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleItem(product);
                  }}
                  className={`absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold transition-all duration-300 ${
                    addedToCart
                      ? "bg-[#2563eb] text-white"
                      : "bg-white text-gray-900 hover:bg-[#2563eb] hover:text-white"
                  } sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100`}
                >
                  <FiShoppingBag size={15} />

                  {addedToCart
                    ? "Added to cart"
                    : "Add to cart"}
                </button>

              </div>

              {/* Product Information */}
              <div className="px-1 pt-4">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-gray-400 dark:text-gray-500">
                      {category}
                    </p>

                    <h3
                      onClick={() => handleProductClick(product)}
                      className="mt-1 cursor-pointer truncate text-sm font-bold text-gray-900 transition-colors hover:text-[#2563eb] dark:text-white"
                    >
                      {productName}
                    </h3>

                  </div>

                  {/* Mobile Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${productName} to wishlist`}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    className="mt-0.5 flex shrink-0 text-gray-400 transition-colors hover:text-[#2563eb] sm:hidden dark:text-gray-500"
                  >
                    <FiHeart size={17} />
                  </button>

                </div>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1.5">

                  <div className="flex items-center gap-0.5 text-[#f59e0b]">
                    <FiStar size={11} fill="currentColor" />
                    <FiStar size={11} fill="currentColor" />
                    <FiStar size={11} fill="currentColor" />
                    <FiStar size={11} fill="currentColor" />
                    <FiStar size={11} fill="currentColor" />
                  </div>

                  <span className="text-[10px] text-gray-400">
                    5.0
                  </span>

                </div>

                {/* Price */}
                <p className="mt-2 text-sm font-black text-gray-900 dark:text-white">
                  ${productPrice.toFixed(2)}
                </p>

              </div>

            </article>
          );
        })}

      </div>

      {/* Mobile View All */}
      <button
        type="button"
        onClick={() => navigate("/shop")}
        className="mt-10 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-3 text-sm font-bold text-gray-900 transition hover:border-[#2563eb] hover:text-[#2563eb] sm:hidden dark:border-white/10 dark:text-white"
      >
        View all products
        <FiArrowRight />
      </button>

    </section>
  );
};

export default FeaturedProducts;