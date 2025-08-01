import { Link } from "react-router-dom";
import { BiXCircle } from "react-icons/bi";

export default function CartItem({ item, handleDelete, handleQuantityChange }) {
  return (
    <div className="flex items-center gap-4 border rounded-lg p-2">
      <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded border bg-white">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1">
        <Link
          to={`/productInformation/${item.id}`}
          className="font-bold hover:text-gray-600"
        >
          {item.name.length <= 20 ? item.name : `${item.name.slice(0, 18)}...`}
        </Link>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-semibold">${item.price.toFixed(2)}</span>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item, e)}
            className="w-12 border rounded text-center text-black outline-none"
          />
        </div>
      </div>

      <button
        aria-label="Remove item"
        onClick={() => handleDelete(item)}
        className="text-2xl text-red-600 hover:opacity-80"
      >
        <BiXCircle />
      </button>
    </div>
  );
}
