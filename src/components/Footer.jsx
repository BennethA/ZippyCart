import { BiCopyright } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t-2 border-gray-300 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-3">
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between px-4 w-full max-w-7xl mx-auto">
        <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
          <Link
            to="/"
            className="font-extrabold text-xl cursor-pointer flex gap-2 items-center"
          > 
            <BsCart /> ZippyCart
          </Link>
          <p className="text-sm text-gray-600 dark:text-[#c0c0c0]">
            Your one-stop shop for all your needs.
          </p>
        </div>
        <div className="flex items-center justify-center sm:justify-end text-gray-700 dark:text-[#c0c0c0] text-sm mt-4 sm:mt-0">
          <BiCopyright className="inline mr-1" />
          2025 ZippyCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
