import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../components/Back";
import Title from "../components/Title";
import PRODUCTS from "../Products.json";
import DataContext from "../Context/DataContext";
import CartLink from "/src/components/Cart-Link.jsx";

export default function Product() {
  const { handleItem, existingCart, logIn } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="pt-[55px] px-4 text-center">
        <Back />
        <Title text1="PRODUCT" text2="NOT FOUND" />
        <p className="text-lg text-gray-600 font-bold">
          Sorry, we couldn’t find this product.
        </p>
      </div>
    );
  }

  return (
    <div>
          <CartLink />
      <Back />
      <main className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-[55px] flex flex-col gap-5 pb-12">
        <Title text1="PRODUCT" text2="DETAILS" />

        <div className="rounded-md overflow-hidden flex items-center justify-center border">
          <img
            loading="lazy"
            src={product.image_url}
            alt={product.name}
            className="rounded-md max-h-[500px] object-contain"
          />
        </div>

        <div className="text-center text-3xl font-bold dark:text-white underline">
          {product.name}
        </div>

        {product.description && (
          <p className="font-semibold text-gray-600 dark:text-[#c0c0c0] leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:gap-10 gap-4 flex-wrap text-gray-700 dark:text-[#c0c0c0] font-semibold">
          {product.brand && <p>Brand: {product.brand}</p>}
          {product.color && <p>Color: {product.color}</p>}
          {product.category && <p>Category: {product.category}</p>}
          {product.quantity && <p>Quantity: {product.quantity}</p>}
          {product.rating && <p>Rating: {product.rating}</p>}
          {product.gender && <p>Gender: {product.gender}</p>}
        </div>

        <div className="text-2xl font-bold">
          Price: ${product.price.toFixed(2)}
        </div>

        <button
          onClick={() => (logIn ? handleItem(product) : navigate("/login"))}
          className={`${
            existingCart.some((i) => i.id === product.id)
              ? "bg-black text-white hover:opacity-80"
              : "bg-white text-black hover:bg-gray-700 hover:text-white"
          } border-2 rounded-sm font-semibold px-4 py-2 w-fit`}
        >
          {existingCart.some((i) => i.id === product.id)
            ? "Remove from Cart"
            : "Add to Cart"}
        </button>
      </main>
    </div>
  );
}
