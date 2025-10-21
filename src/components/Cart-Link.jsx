import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import DataContext from "../Context/DataContext";

export default function CartLink() {
  const { cart, logIn } = useContext(DataContext);

  return (
    <Link
      to={logIn ? "/cart" : "/login"}
      className={`z-50 fixed top-[70px] right-4 sm:right-[5vw] md:right-[7vw] lg:right-[9vw] p-2 flex items-center gap-2 rounded-sm ml-4 hover:opacity-80 bg-[#6d6d6d] font-semibold outline-none text-white`}
    >
      <FaCartShopping />
      {cart.length}
    </Link>
  );
}
