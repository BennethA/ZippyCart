import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { ShoppingBag, Users, Package, DollarSign } from "lucide-react";

export default function AdminHome() {
  const { orders, cart, darkMode } = useContext(DataContext);

  const totalUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  ).length;

  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: cart?.length || 0,
      icon: <Package size={22} />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Total Orders",
      value: orders?.length || 0,
      icon: <ShoppingBag size={22} />,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Active Users",
      value: totalUsers,
      icon: <Users size={22} />,
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Revenue (GHS)",
      value: (orders?.length || 0) * 120,
      icon: <DollarSign size={22} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } transition`}
    >
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`rounded-2xl shadow-md p-5 flex items-center justify-between ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div>
              <h2 className="text-sm font-medium opacity-70">{stat.title}</h2>
              <p className="text-2xl font-semibold mt-2">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl text-white ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-10 p-6 rounded-2xl shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {orders?.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr
                className={`text-left border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <th className="py-2">#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(-5).map((order, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <td className="py-2">{index + 1}.</td>
                  <td>{order.id}</td>
                  <td>GHS {order.total.toFixed(2)}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="opacity-60">No recent orders yet.</p>
        )}
      </div>
    </div>
  );
}
