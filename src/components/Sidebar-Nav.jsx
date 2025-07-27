import { NavLink } from "react-router-dom";

export default function SidebarNav({ page, handleOpenMenu }) {
  return (
    <NavLink
      onClick={handleOpenMenu}
      to={page.link}
      className={({ isActive }) =>
        `mt-6 flex items-center gap-1.5 cursor-pointer font-bold hover:opacity-80 ${
          isActive
            ? "dark:border-[#c0c0c0] border-b-2 border-black"
            : "text-[#474747] dark:text-[#c0c0c0]"
        }`
      }
    >
      {page.icon}
      {page.name}
    </NavLink>
  );
}
