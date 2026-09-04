import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import DataContext from "../Context/DataContext";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userInfo, darkMode } = useContext(DataContext);
  const navigate = useNavigate();


  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = () => {
      if (
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const handleLogout = () => {
    navigate("/login");
  };

  const navLinks = [
    { name: "Overview", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed z-30 top-0 left-0 h-full w-64 transition-transform duration-200 ease-in-out shadow-lg 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          ${darkMode ? "bg-gray-800" : "bg-white"} 
          md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="mt-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm font-medium rounded transition-colors ${
                  isActive
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm opacity-80 mb-2">Logged in as:</p>
          <p className="text-sm font-medium">{userInfo?.name || "Admin"}</p>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 transition-all duration-200">
        {/* Topbar */}
        <div
          className={`flex items-center justify-between px-4 py-3 md:py-4 shadow ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
        </div>

        {/* Main Outlet */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
