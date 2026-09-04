import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";

import PRODUCTS from "../Products.json";
import DataContext from "../Context/DataContext";

const Product = () => {
  const { handleItem, cart, logIn } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return PRODUCTS.filter(
      (item) =>
        item.id !== product.id &&
        item.category?.toLowerCase() === product.category?.toLowerCase(),
    ).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-[90px] sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#2563eb] dark:text-gray-300"
        >
          <FiArrowLeft />
          Back to shop
        </button>

        <div className="rounded-[28px] border border-gray-200 bg-gray-50 px-6 py-20 text-center dark:border-white/10 dark:bg-[#151515]">
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#2563eb]">
            Product
          </p>

          <h1 className="mt-3 text-3xl font-black text-gray-900 dark:text-white">
            Product not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
            Sorry, we couldn&apos;t find the product you are looking for.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-7 rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  const isInCart = cart?.some((item) => item.id === product.id);

  const price = Number(product.price) || 0;

  const rating = Number(product.rating) || 5;

  const stars = Math.round(rating);

  const handleAddToCart = () => {
    if (!logIn) {
      navigate("/login");
      return;
    }

    if (!isInCart) {
      handleItem(product);
    }
  };

  const handleBuyNow = () => {
    if (!logIn) {
      navigate("/login");
      return;
    }

    if (!isInCart) {
      handleItem(product);
    }

    navigate("/cart");
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const getProductPrice = (item) => {
    return Number(item.price ?? item.product_price ?? item.cost ?? 0) || 0;
  };

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pb-20 pt-[85px] sm:px-6 lg:px-8">
      {/* Top navigation */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-[#2563eb] dark:text-gray-300"
        >
          <FiArrowLeft />
          Back to shop
        </button>

        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-bold text-gray-800 transition hover:border-[#2563eb] hover:text-[#2563eb] dark:border-white/10 dark:text-white"
        >
          <FiShoppingBag />
          Cart
        </button>
      </div>

      {/* Product */}
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Product image */}
        <div className="relative overflow-hidden rounded-[28px] bg-gray-100 dark:bg-[#181818]">
          <div className="absolute left-5 top-5 z-10 rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[1.5px] text-gray-900 shadow-sm">
            {product.category || "Fashion"}
          </div>

          <button
            type="button"
            onClick={() => setWishlist((current) => !current)}
            aria-label="Add to wishlist"
            className={`absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition ${
              wishlist
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
            }`}
          >
            <FiHeart className={wishlist ? "fill-current" : ""} size={18} />
          </button>

          <div className="flex min-h-[430px] items-center justify-center p-5 sm:min-h-[580px] sm:p-8">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full max-h-[570px] w-full object-contain mix-blend-multiply dark:mix-blend-normal"
            />
          </div>
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#2563eb]">
            {product.gender
              ? `${product.gender} collection`
              : "ZippyCart collection"}
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-1px] text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar
                  key={index}
                  size={16}
                  className={
                    index < stars
                      ? "fill-current text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }
                />
              ))}
            </div>

            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {rating.toFixed(1)}
            </span>

            <span className="text-gray-300">•</span>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.category || "Fashion"}
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              ${price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-6 max-w-[620px] text-sm leading-7 text-gray-500 dark:text-gray-400">
              {product.description}
            </p>
          )}

          {/* Product details */}
          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-gray-200 py-6 dark:border-white/10">
            {product.brand && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                  Brand
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {product.brand}
                </p>
              </div>
            )}

            {product.color && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                  Color
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {product.color}
                </p>
              </div>
            )}

            {product.gender && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                  Gender
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {product.gender}
                </p>
              </div>
            )}

            {product.quantity && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                  Available
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {product.quantity}
                </p>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
              Quantity
            </p>

            <div className="flex w-fit items-center overflow-hidden rounded-full border border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="flex h-11 w-11 items-center justify-center text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
              >
                <FiMinus size={15} />
              </button>

              <span className="flex h-11 min-w-[45px] items-center justify-center border-x border-gray-200 px-2 text-sm font-bold text-gray-900 dark:border-white/10 dark:text-white">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                className="flex h-11 w-11 items-center justify-center text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
              >
                <FiPlus size={15} />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition ${
                isInCart
                  ? "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white"
                  : "bg-gray-900 text-white hover:bg-[#2563eb]"
              }`}
            >
              <FiShoppingBag />
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="min-h-[52px] rounded-full border-2 border-gray-900 px-7 text-sm font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              Buy Now
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-200 pt-7 dark:border-white/10 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                <FiTruck size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  Fast Delivery
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  Quick & reliable
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                <FiShield size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  Secure Payment
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  Safe checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                <FiRefreshCw size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  Easy Returns
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  Shop with confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product reassurance */}
      <section className="mt-16 rounded-[24px] border border-gray-100 bg-gray-50 p-6 dark:border-white/5 dark:bg-[#151515] sm:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10">
              <FiCheck />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Quality styles
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Carefully selected pieces for your everyday wardrobe.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10">
              <FiTruck />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Convenient delivery
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Get your favourite products delivered with ease.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10">
              <FiShield />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Secure shopping
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                A simple and secure shopping experience from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#2563eb]">
                You may also like
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.8px] text-gray-900 dark:text-white sm:text-3xl">
                Related products
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/shop?category=${encodeURIComponent(product.category || "")}`,
                )
              }
              className="hidden text-sm font-bold text-gray-900 transition hover:text-[#2563eb] sm:block dark:text-white"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((item) => {
              const itemPrice = getProductPrice(item);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/product-information/${item.id}`)}
                  className="group text-left"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-gray-100 dark:bg-[#181818]">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                      <FiArrowRight />
                    </span>
                  </div>

                  <div className="px-1 pt-3">
                    <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="text-sm font-black text-gray-900 dark:text-white">
                        ${itemPrice.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <FiStar className="fill-current text-yellow-500" />
                        5.0
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default Product;
