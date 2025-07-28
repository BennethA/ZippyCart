import { useContext } from "react";
import DataContext from "../Context/DataContext";

export default function FilterNav() {
  const {
    filter,
    setFilter,
    categories,
    setPrevPageNumber,
    setNextPageNumber,
  } = useContext(DataContext);

  const handleFilterChange = (categoryName) => {
    setPrevPageNumber(0);
    setNextPageNumber(15);
    setFilter(categoryName.toLowerCase());
  };

  return (
    <div className={`flex overflow-x-auto border-2 my-scrollbar mx-4`}>
      {categories.map((category) => {
        return (
          <button
            type="button"
            aria-pressed={filter.toLowerCase() === category.name.toLowerCase()}
            key={category.name}
            onClick={() => handleFilterChange(category.name)}
            className={`border-x px-4 py-2 font-extrabold transition-all duration-500 hover:opacity-80 first:border-l-0 last:border-r-0 ${
              filter.toLowerCase() === category.name.toLowerCase()
                ? `bg-black text-white dark:bg-white dark:text-black`
                : `hover:bg-[#00000041]`
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
