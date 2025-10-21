import { Link } from "react-router-dom";
import { BiLeftArrowCircle } from "react-icons/bi";

export default function Back() {
  return (
    <Link
      to="/shop"
      className={`text-2xl fixed rounded-sm mt-3 ml-4 z-50 hover:opacity-80 bg-[#6d6d6d] p-2 font-semibold outline-none text-white`}
    >
      <BiLeftArrowCircle />
    </Link>
  );
}
