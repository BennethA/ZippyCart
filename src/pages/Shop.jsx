import Title from "../components/Title";
import Search from "../components/Search";
import Products from "../components/Products";
import FilterNav from "../components/Filter-Nav";

export default function Shop() {
  return (
    <main className={`pt-[55px] pb-7`}>
      <Title text1="AVAILABLE" text2="PRODUCTS" />
      <FilterNav />
      <Search />
      <Products />
    </main>
  );
}
