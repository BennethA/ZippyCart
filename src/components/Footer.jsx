import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d0d0d]">
      {/* Newsletter */}
      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] bg-[#111111] px-6 py-10 sm:px-10 lg:px-14">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-[540px]">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-white/50">
                Stay in the loop
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.8px] text-white sm:text-3xl">
                Get style updates in your inbox.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/55">
                Be the first to discover new arrivals, exclusive offers,
                and the latest collections from ZippyCart.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex w-full max-w-[500px] flex-col gap-3 sm:flex-row"
            >
              <div className="flex flex-1 items-center rounded-full border border-white/10 bg-white/5 px-4 transition focus-within:border-white/30">
                <FiMail className="shrink-0 text-white/40" size={17} />

                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#2563eb] hover:text-white"
              >
                Subscribe
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-gray-200 pb-12 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                Z
              </span>

              <span className="text-xl font-black tracking-[-0.7px] text-gray-900 dark:text-white">
                ZippyCart
              </span>
            </Link>

            <p className="mt-5 max-w-[320px] text-sm leading-7 text-gray-500 dark:text-gray-400">
              Your destination for modern fashion, everyday essentials,
              and pieces that help you express your personal style.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:addobenneth6@gmail.com"
                className="flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
              >
                <FiMail size={15} />
                addobenneth6@gmail.com
              </a>

              <a
                href="tel:+233539540191"
                className="flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
              >
                <FiPhone size={15} />
                +233 53 954 1091
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <FiMapPin size={15} />
                Ghana
              </div>
            </div>

            {/* Socials */}
            <div className="mt-7 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white dark:border-white/10 dark:text-gray-400"
              >
                <FiInstagram size={16} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white dark:border-white/10 dark:text-gray-400"
              >
                <FiFacebook size={16} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white dark:border-white/10 dark:text-gray-400"
              >
                <FiTwitter size={16} />
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white dark:border-white/10 dark:text-gray-400"
              >
                <FaTiktok size={14} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[1.5px] text-gray-900 dark:text-white">
              Shop
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  All products
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?category=Clothing"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Clothing
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?category=Gown"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Gowns
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?category=Jeans"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Jeans
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?category=Footwear"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Footwear
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?category=Accessories"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[1.5px] text-gray-900 dark:text-white">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Sign in
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Create account
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Shopping cart
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  My orders
                </Link>
              </li>

              <li>
                <Link
                  to="/user-information"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  My profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[1.5px] text-gray-900 dark:text-white">
              Help
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  About ZippyCart
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className="text-sm text-gray-500 transition-colors hover:text-[#2563eb] dark:text-gray-400"
                >
                  Contact us
                </Link>
              </li>

              <li>
                <span className="cursor-default text-sm text-gray-500 dark:text-gray-400">
                  Delivery information
                </span>
              </li>

              <li>
                <span className="cursor-default text-sm text-gray-500 dark:text-gray-400">
                  Returns & exchanges
                </span>
              </li>

              <li>
                <span className="cursor-default text-sm text-gray-500 dark:text-gray-400">
                  Privacy policy
                </span>
              </li>

              <li>
                <span className="cursor-default text-sm text-gray-500 dark:text-gray-400">
                  Terms & conditions
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} ZippyCart. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-gray-200 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1px] text-gray-400 dark:border-white/10 dark:text-gray-500">
              Secure checkout
            </span>

            <span className="rounded-md border border-gray-200 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1px] text-gray-400 dark:border-white/10 dark:text-gray-500">
              Fast delivery
            </span>

            <span className="rounded-md border border-gray-200 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1px] text-gray-400 dark:border-white/10 dark:text-gray-500">
              Easy returns
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;