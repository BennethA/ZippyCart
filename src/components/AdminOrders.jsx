import { useContext } from "react";
import DataContext from "../Context/DataContext";

export default function AdminOrders() {
  const { orders, darkMode } = useContext(DataContext);
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } transition`}
    >
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders?.length > 0 ? (
        <div
          className={`rounded-2xl shadow-md overflow-x-auto ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <table className="w-full text-sm">
            <thead>
              <tr
                className={`text-left border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <th className="py-3 px-4">#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <td className="py-3 px-4">{index + 1}.</td>
                  <td>{order.id}</td>
                  <td>GHS {order.total.toFixed(2)}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="opacity-60">No orders have been placed yet.</p>
      )}
    </div>
  );
}
