import Title from "../components/Title";
import Search from "../components/Search";
import Products from "../components/Products";
import FilterNav from "../components/Filter-Nav";

export default function Shop() {
  return (
    <main className="pb-7 pt-[55px]">

      {/* Shop Header */}
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Title
          text1="AVAILABLE"
          text2="PRODUCTS"
        />

        <p className="mx-auto -mt-2 mb-8 max-w-[600px] text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
          Explore our collection of clothing, gowns,
          footwear, accessories, and more.
        </p>
      </div>

      {/* Desktop category navigation */}
      <div className="hidden lg:block">
        <FilterNav />
      </div>

      {/* Search */}
      <Search />

      {/* Products */}
      <Products />

    </main>
  );
}
