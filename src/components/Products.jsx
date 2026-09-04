import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiShoppingBag,
  FiSliders,
  FiStar,
} from "react-icons/fi";

import PRODUCTS from "../Products.json";
import DataContext from "../Context/DataContext";

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { filter, setFilter, categories, cart, handleItem } =
    useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /*
   * Keep the filter synchronized with the URL.
   */
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (!categoryFromUrl) {
      return;
    }

    const matchingCategory = categories?.find(
      (category) =>
        category.name?.toLowerCase() === categoryFromUrl.toLowerCase(),
    );

    if (matchingCategory) {
      setFilter(matchingCategory.name);
    }
  }, [searchParams, categories, setFilter]);

  /*
   * Listen for searches from the Search component.
   */
  useEffect(() => {
    const handleSearch = (event) => {
      setSearchTerm(event.detail || "");
      setCurrentPage(1);
    };

    window.addEventListener("zippycart-search", handleSearch);

    return () => {
      window.removeEventListener("zippycart-search", handleSearch);
    };
  }, []);

  /*
   * Filter products.
   */
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filter && filter !== "All") {
      const selectedFilter = filter.toLowerCase().trim();

      result = result.filter((product) => {
        const category = String(product.category || "")
          .toLowerCase()
          .trim();

        const gender = String(product.gender || "")
          .toLowerCase()
          .trim();

        return category === selectedFilter || gender === selectedFilter;
      });
    }

    /*
     * Search filter
     */
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();

      result = result.filter((product) => {
        const name = String(
          product.name || product.title || product.product_name || "",
        ).toLowerCase();

        const category = String(product.category || "").toLowerCase();

        const gender = String(product.gender || "").toLowerCase();

        return (
          name.includes(search) ||
          category.includes(search) ||
          gender.includes(search)
        );
      });
    }

    /*
     * Sorting
     */
    if (sortBy === "price-low") {
      result.sort((a, b) => getPrice(a) - getPrice(b));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (sortBy === "name") {
      result.sort((a, b) => getProductName(a).localeCompare(getProductName(b)));
    }

    return result;
  }, [filter, searchTerm, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  /*
   * Make sure current page is valid.
   */
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /*
   * Check whether product is already in cart.
   */
  const isInCart = (product) => {
    return cart?.some((item) => item.id === product.id);
  };

  /*
   * Open product details.
   */
  const handleProductClick = (product) => {
    navigate(`/product-information/${product.id}`);
  };

  /*
   * Handle category changes.
   */
  const handleCategoryChange = (category) => {
    setFilter(category);
    setCurrentPage(1);
    setShowFilters(false);

    /*
     * Update the URL too.
     */
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }

    setSearchParams(searchParams);
  };

  /*
   * Clear everything.
   */
  const clearFilters = () => {
    setFilter("All");
    setSearchTerm("");
    setSortBy("featured");
    setCurrentPage(1);
    setShowFilters(false);

    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  const getProductCountLabel = () => {
    if (filteredProducts.length === 1) {
      return "1 product";
    }

    return `${filteredProducts.length} products`;
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-8">
      {/* Shop toolbar */}
      <div className="mb-7 rounded-[22px] border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-[#151515]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Results */}
          <div>
            <p className="text-xs font-semibold text-gray-400">Showing</p>

            <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
              {getProductCountLabel()}

              {filter !== "All" && (
                <span className="font-normal text-gray-400"> in {filter}</span>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-xs font-bold text-gray-800 transition hover:border-[#2563eb] hover:text-[#2563eb] lg:hidden dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white"
            >
              <FiSliders size={15} />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-full border border-gray-200 bg-white px-5 py-3 pr-10 text-xs font-bold text-gray-800 outline-none transition focus:border-[#2563eb] sm:w-[190px] dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white"
              >
                <option value="featured">Featured</option>

                <option value="price-low">Price: Low to High</option>

                <option value="price-high">Price: High to Low</option>

                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-white/10 lg:hidden">
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => handleCategoryChange(category.name)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    filter === category.name
                      ? "bg-[#2563eb] text-white"
                      : "bg-white text-gray-600 hover:text-[#2563eb] dark:bg-[#202020] dark:text-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((product, index) => {
            const productName = getProductName(product);

            const productPrice = getPrice(product);

            const category = product.category || "Fashion";

            const addedToCart = isInCart(product);

            return (
              <article
                key={product.id || `${productName}-${index}`}
                className="group min-w-0"
              >
                {/* Product image */}
                <div
                  className="relative cursor-pointer overflow-hidden rounded-[20px] bg-gray-100 dark:bg-[#181818]"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={productName}
                        loading={index > 3 ? "lazy" : "eager"}
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* New badge */}
                  {index < 4 && currentPage === 1 && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-[1.2px] text-gray-900 shadow-sm">
                      New
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${productName} to wishlist`}
                    onClick={(event) => event.stopPropagation()}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-sm transition-all duration-300 hover:bg-[#2563eb] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <FiHeart size={16} />
                  </button>

                  {/* Cart */}
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleItem(product);
                    }}
                    className={`absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-full py-3 text-[11px] font-bold transition-all duration-300 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 ${
                      addedToCart
                        ? "bg-[#2563eb] text-white"
                        : "bg-white text-gray-900 hover:bg-[#2563eb] hover:text-white"
                    }`}
                  >
                    <FiShoppingBag size={14} />

                    {addedToCart ? "Added to cart" : "Add to cart"}
                  </button>
                </div>

                {/* Product information */}
                <div className="px-1 pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-[1.3px] text-gray-400 dark:text-gray-500">
                        {category}
                      </p>

                      <h3
                        onClick={() => handleProductClick(product)}
                        className="mt-1 cursor-pointer truncate text-sm font-bold text-gray-900 transition-colors hover:text-[#2563eb] dark:text-white"
                      >
                        {productName}
                      </h3>
                    </div>

                    <button
                      type="button"
                      aria-label={`Wishlist ${productName}`}
                      onClick={(event) => event.stopPropagation()}
                      className="shrink-0 text-gray-400 hover:text-[#2563eb] sm:hidden dark:text-gray-500"
                    >
                      <FiHeart size={17} />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="flex gap-0.5 text-[#f59e0b]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar key={star} size={10} fill="currentColor" />
                      ))}
                    </div>

                    <span className="text-[10px] text-gray-400">5.0</span>
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
      ) : (
        /* Empty state */
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[24px] border border-dashed border-gray-200 px-6 text-center dark:border-white/10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1b1b1b]">
            <FiShoppingBag size={24} className="text-gray-400" />
          </div>

          <h3 className="mt-5 text-lg font-black text-gray-900 dark:text-white">
            No products found
          </h3>

          <p className="mt-2 max-w-[360px] text-sm leading-6 text-gray-400">
            We couldn't find anything matching your current search or filter.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-[#2563eb] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-white"
            >
              <FiArrowRight className="rotate-180" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2),
              )
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-xs font-bold transition ${
                    currentPage === page
                      ? "bg-[#2563eb] text-white"
                      : "border border-gray-200 text-gray-600 hover:border-[#2563eb] hover:text-[#2563eb] dark:border-white/10 dark:text-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:text-white"
            >
              <FiArrowRight />
            </button>
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </section>
  );
};

/*
 * Helpers
 */

const getProductName = (product) => {
  return (
    product.name || product.title || product.product_name || "Fashion Product"
  );
};

const getPrice = (product) => {
  const price = product.price ?? product.product_price ?? product.cost ?? 0;

  return Number(price) || 0;
};

export default Products;
