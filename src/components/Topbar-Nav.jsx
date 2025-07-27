import { NavLink } from "react-router-dom";

export default function TopbarNav({ page }) {
  return (
    <NavLink
      to={page.link}
      className={({ isActive }) =>
        `flex items-center gap-1.5 cursor-pointer font-bold hover:opacity-80 transition-all duration-300 ease-in-out border-b-2 mt-2 pb-1 sm:px-2 ${
          isActive
            ? "dark:border-[#c0c0c0] border-black"
            : "text-[#474747] dark:text-[#c0c0c0] border-transparent"
        }`
      }
    >
      <span className="hidden md:block">{page.icon}</span>
      {page.name}
    </NavLink>
  );
}
