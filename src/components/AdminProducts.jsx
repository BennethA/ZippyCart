import { useContext } from "react";
import DataContext from "../Context/DataContext";

export default function AdminProducts() {
  const { cart, handleDelete, darkMode } = useContext(DataContext);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } transition`}
    >
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      {cart?.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className={`rounded-2xl shadow-md overflow-hidden ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-sm opacity-70 mb-2">{product.brand}</p>
                <p className="font-semibold mb-3">GHS {product.price}</p>
                <button
                  onClick={() => handleDelete(product)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="opacity-60">No products available.</p>
      )}
    </div>
  );
}
