import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { BiX } from "react-icons/bi";

export default function Search() {
  const { filter, setFilter, openSearch, setOpenSearch } =
    useContext(DataContext);

  if (!openSearch) return null;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`flex overflow-x-auto m-4 mt-6 items-center gap-2`}
    >
      <label className="sr-only" htmlFor="search-input">
        Search for product type
      </label>
      <input
        id="search-input"
        type="search"
        placeholder="Search products..."
        value={filter}
        onChange={handleFilterChange}
        className="w-full max-w-[300px] outline-none p-2 font-bold py-1.5 text-gray-600 border-2"
      />
      <BiX
        onClick={() => setOpenSearch()}
        className="text-3xl hover:opacity-80 cursor-pointer"
      />
    </form>
  );
}
