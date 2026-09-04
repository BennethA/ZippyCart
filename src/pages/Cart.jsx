import Back from "../components/Back";
import Title from "../components/Title";

import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiCheck,
  FiLock,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

import DataContext from "../Context/DataContext";

export default function Cart() {
  const { logIn, cart, setCart, handleDelete } = useContext(DataContext);
  const navigate = useNavigate();

  const totalAmount = useMemo(
    () =>
      cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
    [cart]
  );

  const deliveryFee = cart.length > 0 ? 10 : 0;
  const grandTotal = totalAmount + deliveryFee;

  const handleQuantityChange = (item, quantity) => {
    const updatedQuantity = Math.max(1, Number(quantity));

    const updatedCart = cart.map((product) =>
      product.id === item.id
        ? { ...product, quantity: updatedQuantity }
        : product
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleDecrease = (item) => {
    const currentQuantity = Number(item.quantity) || 1;

    if (currentQuantity > 1) {
      handleQuantityChange(item, currentQuantity - 1);
    }
  };

  const handleIncrease = (item) => {
    const currentQuantity = Number(item.quantity) || 1;
    handleQuantityChange(item, currentQuantity + 1);
  };

  const getProductName = (product) =>
    product.name ||
    product.title ||
    product.product_name ||
    `Product #${product.id}`;

  const getProductImage = (product) =>
    product.image_url || product.image || product.thumbnail;

  const getProductPrice = (product) => Number(product.price) || 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Back />

      <main className="mx-auto max-w-[1400px] pb-16 pt-[55px]">
        <Title text1="YOUR" text2="CART" />

        {cart.length === 0 ? (
          /* EMPTY CART */
          <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d0d0d]">
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                <FiShoppingBag
                  size={34}
                  className="text-gray-700 dark:text-white"
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Your cart is empty
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                Looks like you haven't added anything to your cart yet.
                Discover something you love and add it to your collection.
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                CONTINUE SHOPPING
                <FiArrowRight />
              </button>
            </div>
          </section>
        ) : (
          <>
            {/* CART HEADER */}
            <div className="mt-8 flex flex-col justify-between gap-2 border-b border-gray-200 pb-5 sm:flex-row sm:items-end dark:border-white/10">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your
                  shopping bag
                </p>
              </div>

              <button
                onClick={() => navigate("/shop")}
                className="flex w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 transition hover:opacity-60"
              >
                Continue Shopping
                <FiArrowRight size={15} />
              </button>
            </div>

            {/* MAIN CART */}
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
              {/* PRODUCTS */}
              <section className="space-y-4">
                {cart.map((item) => {
                  const quantity = Number(item.quantity) || 1;
                  const price = getProductPrice(item);
                  const image = getProductImage(item);

                  return (
                    <article
                      key={item.id}
                      className="group relative flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-lg sm:gap-6 dark:border-white/10 dark:bg-[#0d0d0d]"
                    >
                      {/* IMAGE */}
                      <button
                        onClick={() =>
                          navigate(`/product-information/${item.id}`)
                        }
                        className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-40 sm:w-32 dark:bg-white/5"
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={getProductName(item)}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-400">
                            <FiShoppingBag size={28} />
                          </div>
                        )}
                      </button>

                      {/* DETAILS */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                        <div className="pr-8">
                          {item.category && (
                            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                              {item.category}
                            </p>
                          )}

                          <button
                            onClick={() =>
                              navigate(`/product-information/${item.id}`)
                            }
                            className="text-left text-base font-bold leading-6 transition hover:opacity-60 sm:text-lg"
                          >
                            {getProductName(item)}
                          </button>

                          {item.color && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Color: {item.color}
                            </p>
                          )}

                          <p className="mt-2 text-base font-semibold">
                            ${price.toFixed(2)}
                          </p>
                        </div>

                        {/* QUANTITY */}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex items-center overflow-hidden rounded-full border border-gray-200 dark:border-white/15">
                            <button
                              onClick={() => handleDecrease(item)}
                              disabled={quantity <= 1}
                              className="flex h-9 w-9 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-white/10"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus size={14} />
                            </button>

                            <input
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={(e) =>
                                handleQuantityChange(item, e.target.value)
                              }
                              className="h-9 w-10 border-x border-gray-200 bg-transparent text-center text-sm font-semibold outline-none dark:border-white/15"
                            />

                            <button
                              onClick={() => handleIncrease(item)}
                              className="flex h-9 w-9 items-center justify-center transition hover:bg-gray-100 dark:hover:bg-white/10"
                              aria-label="Increase quantity"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>

                          <p className="text-right text-sm font-bold sm:text-base">
                            ${(price * quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(item)}
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </article>
                  );
                })}
              </section>

              {/* ORDER SUMMARY */}
              <aside className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#111]">
                  <h2 className="text-xl font-bold">Order Summary</h2>

                  <div className="mt-6 space-y-4 border-b border-gray-200 pb-5 text-sm dark:border-white/10">
                    <div className="flex justify-between gap-4 text-gray-600 dark:text-gray-400">
                      <span>
                        {cart.length === 1 ? "Product" : "Products"} Total
                      </span>
                      <span className="font-semibold text-black dark:text-white">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-gray-600 dark:text-gray-400">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-black dark:text-white">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5">
                    <span className="text-base font-semibold">Grand Total</span>
                    <span className="text-2xl font-bold">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      logIn ? navigate("/placeOrder") : navigate("/login")
                    }
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-bold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    PLACE ORDER
                    <FiArrowRight />
                  </button>

                  {/* TRUST */}
                  <div className="mt-6 space-y-4 border-t border-gray-200 pt-5 dark:border-white/10">
                    <div className="flex items-start gap-3">
                      <FiTruck
                        className="mt-0.5 shrink-0 text-gray-600 dark:text-gray-300"
                        size={18}
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          Reliable Delivery
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          We'll get your order to you safely.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiLock
                        className="mt-0.5 shrink-0 text-gray-600 dark:text-gray-300"
                        size={18}
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          Secure Checkout
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          Your checkout experience is protected.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiCheck
                        className="mt-0.5 shrink-0 text-gray-600 dark:text-gray-300"
                        size={18}
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          Easy Shopping
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          Simple ordering from start to finish.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}