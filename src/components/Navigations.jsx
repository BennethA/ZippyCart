import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { BiMenu, BiMoon, BiSearch, BiSun, BiUser, BiX } from "react-icons/bi";

import { BsCart3, BsHeart } from "react-icons/bs";

import { FiChevronDown, FiShoppingBag } from "react-icons/fi";

import DataContext from "../Context/DataContext";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    logIn,
    darkMode,
    setDarkMode,
    openMenu,
    setOpenMenu,
    cart,
    openSearch,
    setOpenSearch,
    setFilter,
  } = useContext(DataContext);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    setFilter(searchValue.trim());
    navigate("/shop");
    setOpenSearch(false);
  };

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname]);

  const cartCount = cart?.length || 0;

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contactUs",
    },
  ];

  const categoryLinks = [
    "Female",
    "Male",
    "Gown",
    "Clothing",
    "Jeans",
    "Footwear",
    "Accessories",
    "Perfume",
  ];

  return (
    <>
      {/* TOP PROMO BAR */}
      <div className="hidden md:block bg-[#111111] text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center px-6 py-2 text-xs font-medium tracking-wide">
          Free shipping on selected orders
          <span className="mx-3 text-white/40">|</span>
          Easy returns within 30 days
          <span className="mx-3 text-white/40">|</span>
          Secure checkout
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <header className="sticky top-0 z-[100] border-b border-black/10 bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-[#0d0d0d]/95">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* MAIN ROW */}
          <div className="flex h-[72px] items-center justify-between gap-4">
            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex shrink-0 items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:text-black">
                <FiShoppingBag className="text-[21px]" />
              </div>

              <div className="leading-none">
                <span className="block text-[21px] font-extrabold tracking-[-0.7px] text-[#111] dark:text-white">
                  Zippy
                  <span className="text-[#2563eb]">Cart</span>
                </span>

                <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[2px] text-gray-400 sm:block">
                  Shop your style
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative py-7 text-[14px] font-semibold transition-colors ${
                      active
                        ? "text-[#2563eb]"
                        : "text-gray-700 hover:text-[#2563eb] dark:text-gray-300"
                    }`}
                  >
                    {item.name}

                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#2563eb]" />
                    )}
                  </Link>
                );
              })}

              {/* COLLECTIONS */}
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 py-7 text-[14px] font-semibold text-gray-700 transition-colors hover:text-[#2563eb] dark:text-gray-300"
                >
                  Collections
                  <FiChevronDown className="text-sm transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className="pointer-events-none absolute left-1/2 top-[67px] w-[210px] -translate-x-1/2 translate-y-2 rounded-2xl border border-black/10 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-[#171717]">
                  {categoryLinks.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setFilter(category);
                        navigate("/shop");
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#2563eb] dark:text-gray-300 dark:hover:bg-white/5"
                    >
                      {category}
                      <span className="text-gray-300">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="hidden min-w-0 flex-1 lg:block lg:max-w-[330px]"
            >
              <div className="relative">
                <BiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search dresses, shoes, watches..."
                  className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:bg-white/10"
                />
              </div>
            </form>

            {/* ACTIONS */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {/* MOBILE SEARCH */}
              <button
                type="button"
                onClick={() => setOpenSearch(!openSearch)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10 lg:hidden"
                aria-label="Search"
              >
                <BiSearch />
              </button>

              {/* WISHLIST */}
              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10 sm:flex"
                aria-label="Wishlist"
              >
                <BsHeart />
              </button>

              {/* DARK MODE */}
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <BiSun /> : <BiMoon />}
              </button>

              {/* USER */}
              <button
                type="button"
                onClick={() => navigate(logIn ? "/userInformation" : "/login")}
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-xl text-gray-700 transition hover:border-[#2563eb] hover:text-[#2563eb] dark:border-white/10 dark:text-gray-200 sm:flex"
                aria-label={logIn ? "Account" : "Login"}
              >
                <BiUser />
              </button>

              {/* CART */}
              <button
                type="button"
                onClick={() => navigate(logIn ? "/cart" : "/login")}
                className="relative flex h-10 items-center gap-2 rounded-full bg-[#111] px-3 text-white transition hover:bg-[#2563eb] dark:bg-white dark:text-black dark:hover:bg-[#2563eb] dark:hover:text-white"
                aria-label="Shopping cart"
              >
                <BsCart3 className="text-lg" />

                <span className="hidden text-sm font-semibold sm:block">
                  Cart
                </span>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563eb] px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </button>

              {/* MOBILE MENU */}
              <button
                type="button"
                onClick={handleMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-800 transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10 lg:hidden"
                aria-label="Open menu"
              >
                {openMenu ? <BiX /> : <BiMenu />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              openSearch ? "max-h-20 pb-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <BiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products..."
                  autoFocus={openSearch}
                  className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </form>
          </div>
        </div>

        {/* CATEGORY BAR */}
        <div className="hidden border-t border-black/5 lg:block dark:border-white/5">
          <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-7 overflow-x-auto px-6">
            {categoryLinks.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFilter(category);
                  navigate("/shop");
                }}
                className="whitespace-nowrap py-3 text-[12px] font-medium text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden ${
          openMenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            openMenu ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* DRAWER */}
        <aside
          className={`absolute bottom-0 left-0 top-0 w-[85%] max-w-[360px] bg-white p-6 shadow-2xl transition-transform duration-300 dark:bg-[#111] ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl font-extrabold text-[#111] dark:text-white"
            >
              Zippy<span className="text-[#2563eb]">Cart</span>
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl dark:bg-white/10"
            >
              <BiX />
            </button>
          </div>

          <nav className="flex flex-col">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`border-b border-gray-100 py-4 text-base font-semibold dark:border-white/10 ${
                  location.pathname === item.path
                    ? "text-[#2563eb]"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-gray-400">
                Shop by category
              </p>

              <div className="grid grid-cols-2 gap-2">
                {categoryLinks.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setFilter(category);
                      navigate("/shop");
                      closeMenu();
                    }}
                    className="rounded-xl bg-gray-50 px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-[#2563eb]/10 hover:text-[#2563eb] dark:bg-white/5 dark:text-gray-300"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                navigate(logIn ? "/userInformation" : "/login");
                closeMenu();
              }}
              className="mt-8 flex items-center gap-3 rounded-xl bg-[#111] px-4 py-3 font-semibold text-white dark:bg-white dark:text-black"
            >
              <BiUser />
              {logIn ? "My Account" : "Sign In"}
            </button>
          </nav>
        </aside>
      </div>
    </>
  );
}
