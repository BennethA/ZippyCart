import Back from "../components/Back";
import Title from "../components/Title";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/Cart-Item";
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

  const handleQuantityChange = (item, e) => {
    const updatedQuantity = Number(e.target.value);
    const updatedCart = cart.map((product) =>
      product.id === item.id
        ? { ...product, quantity: updatedQuantity }
        : product
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="px-4">
      <Back />
      <main className="pt-[55px] pb-10">
        <Title text1="YOUR" text2="CART" />

        <div className="flex gap-4 my-4 border-t-2 pt-4 overflow-x-auto my-scrollbar">
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                handleQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <div className="font-bold text-center py-8">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
            <div className="text-lg font-semibold space-y-1">
              <p>
                {cart.length > 1 ? "Products" : "Product"} Total: $
                {totalAmount.toFixed(2)}
              </p>
              <p>Delivery Fee: $10.00</p>
              <p className="font-bold">
                Grand Total: ${(totalAmount + 10).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => {
                logIn ? navigate("/placeOrder") : navigate("/login");
              }}
              className="border-2 px-6 py-2 rounded-md font-bold hover:bg-black hover:text-white transition dark:hover:bg-white dark:hover:text-black"
            >
              PLACE ORDER
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
