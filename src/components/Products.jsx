import PRODUCTS from "../Products.json";
import { FaStar } from "react-icons/fa6";
import DataContext from "../Context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartLink from "/src/components/Cart-Link.jsx";

export default function Products() {
  const {
    logIn,
    filter,
    categories,
    handleItem,
    existingCart,
    prevPageNumber,
    setPrevPageNumber,
    nextPageNumber,
    setNextPageNumber,
  } = useContext(DataContext);

  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const products = PRODUCTS;

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lowerFilter = filter.toLowerCase().trim();
    const filteredProducts = products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(lowerFilter) ||
        product.gender?.toLowerCase() === lowerFilter ||
        product.category?.toLowerCase() === lowerFilter ||
        categories.some(
          (category) =>
            category.name.toLowerCase() === lowerFilter &&
            product.category.toLowerCase() === category.name.toLowerCase()
        )
      );
    });
    setFilteredProducts(
      filteredProducts.length <= 0 ? PRODUCTS : filteredProducts
    );
  }, [filter, products, categories]);

  const handlePreviousPage = () => {
    if (prevPageNumber > 0) {
      setPrevPageNumber(prevPageNumber - 15);
      setNextPageNumber(nextPageNumber - 15);
    }
  };

  const handleNextPage = () => {
    if (nextPageNumber < filteredProducts.length) {
      setPrevPageNumber(prevPageNumber + 15);
      setNextPageNumber(nextPageNumber + 15);
    }
  };

  return (
    <div>
      <CartLink />
      <main className="flex sm:gap-8 gap-3 flex-wrap justify-center mt-7">
        {filteredProducts
          .slice(prevPageNumber, nextPageNumber)
          .map((product) => (
            <div
              key={product.id}
              className="sm:w-[200px] w-[150px] relative border-2 flex flex-col pb-1"
            >
              <Link to={`/productInformation/${product.id}`}>
                <div
                  className={`h-[250px] overflow-hidden flex items-center mb-1 bg-white ${
                    !imageLoaded && "blur-[5px]"
                  }`}
                >
                  <img
                    loading="lazy"
                    alt={product.name}
                    src={product.image_url}
                    className={`text-center overflow-hidden`}
                  />
                </div>
                <div className={`border-b-2 px-2 font-bold text-center pb-1`}>
                  <p>
                    {product.name.length <= 15
                      ? product.name
                      : product.name.slice(0, 17)}
                    ...
                  </p>
                </div>
                <div className="font-bold text-center flex justify-between items-center mx-2 my-1">
                  <p>${product.price.toFixed(2)}</p>
                  <div className="font-bold flex items-center gap-[2px]">
                    <p>{product.rating.toFixed(1)}</p>
                    <FaStar className="text-[gold]" />
                  </div>
                </div>
              </Link>
              {existingCart.some((item) => item.id === product.id) ? (
                <button
                  aria-label="Remove from cart"
                  onClick={() => handleItem(product)}
                  className="text-white rounded-sm font-semibold border-2 bg-black mx-2"
                >
                  Remove
                </button>
              ) : (
                <button
                  aria-label="Add to cart"
                  onClick={() => {
                    logIn ? handleItem(product) : navigate("/login");
                  }}
                  className="bg-white border-2 text-black rounded-sm font-semibold hover:bg-[gray] hover:text-white mx-2"
                >
                  Add to cart
                </button>
              )}
            </div>
          ))}
      </main>

      <div className="mt-9 flex gap-2 items-center justify-center text-xl">
        <button
          className={`rounded p-1 px-5 ${
            prevPageNumber > 0
              ? "bg-slate-500 text-white hover:opacity-80"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handlePreviousPage}
          disabled={prevPageNumber <= 0}
        >
          Previous
        </button>

        <button
          className={`rounded p-1 px-5 ${
            nextPageNumber < filteredProducts.length
              ? "bg-slate-500 text-white hover:opacity-80"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleNextPage}
          disabled={nextPageNumber >= filteredProducts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
