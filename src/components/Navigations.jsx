import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopbarNav from "./Topbar-Nav";
import SidebarNav from "./Sidebar-Nav";
import { CgHome } from "react-icons/cg";
import { PiSignIn } from "react-icons/pi";
import { LuContact } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaStore, FaUserCheck } from "react-icons/fa6";
import { BiMenu, BiMoon, BiSearch, BiSun, BiUser, BiX } from "react-icons/bi";
import DataContext from "../Context/DataContext";
import { BsCart } from "react-icons/bs";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const { logIn, openSearch, setOpenSearch, darkMode, setDarkMode } =
    useContext(DataContext);

  const handleOpenMenu = () => setOpenMenu(!openMenu);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const pages = [
    { id: 1, link: "/", name: "Home", icon: <CgHome /> },
    { id: 2, link: "/shop", name: "Shop", icon: <FaStore /> },
    { id: 3, link: "/about", name: "About", icon: <AiOutlineInfoCircle /> },
    { id: 4, link: "/contactUs", name: "Contact", icon: <LuContact /> },
    !logIn && { id: 5, link: "/login", name: "Login", icon: <PiSignIn /> },
  ].filter(Boolean);

  return (
    <nav className="z-[100] sticky top-0 right-0 left-0 border-b-2 border-gray-300 bg-white dark:bg-black px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex justify-between items-center py-3 h-14 w-full mx-auto px-4">
        <Link
          to="/"
          className="font-extrabold text-xl cursor-pointer flex gap-2 items-center"
        >
          <BsCart /> ZippyCart
        </Link>

        <ul className="hidden sm:flex gap-3 font-semibold">
          {pages.map((page, index) => (
            <li key={index}>
              <TopbarNav page={page} />
            </li>
          ))}
        </ul>

        <ul
          className={`sm:hidden fixed transition-all duration-500 top-[54px] translate-x-[-100%] left-0 w-[270px] px-[30px] py-[20px] text-[17px] font-semibold overflow-y-auto bg-white dark:bg-black border-gray-300 border-r-2 bottom-0 scrollbar scrollbar-thumb-black ${
            openMenu ? "translate-x-[0%]" : ""
          }`}
        >
          {pages.map((page, index) => (
            <li key={index}>
              <SidebarNav page={page} handleOpenMenu={handleOpenMenu} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {location.pathname === "/shop" && (
            <BiSearch
              className="hover:opacity-80 cursor-pointer text-xl"
              onClick={() => setOpenSearch(!openSearch)}
            />
          )}
          <div
            className="hover:opacity-80 cursor-pointer text-xl"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <BiMoon /> : <BiSun />}
          </div>
          <div
            onClick={() => navigate(logIn ? "/userInformation" : "/login")}
            className="hover:opacity-80 rounded-full cursor-pointer text-xl"
          >
            {logIn ? <FaUserCheck className="text-green-600" /> : <BiUser />}
          </div>
          <div
            onClick={handleOpenMenu}
            className="sm:hidden text-3xl cursor-pointer hover:opacity-80"
          >
            {openMenu ? <BiX /> : <BiMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
}
