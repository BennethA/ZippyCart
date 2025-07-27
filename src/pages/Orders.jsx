import { useContext } from "react";
import Back from "../components/Back";
import Title from "../components/Title";
import DataContext from "../Context/DataContext";

export default function Orders() {
  const { cart } = useContext(DataContext);
  return (
    <>
      <Back />
      <div className={`px-4 sm:p-[5vw] md:px-[7vw] lg:px-[9vw] pt-[55px] pb-7`}>
        <Title text1="YOUR" text2="ORDERS" />
        <div className="flex justify-between font-semibold border-b-2">
          <p>Product</p>
          <p>Date</p>
          <p>Quantity</p>
        </div>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 border-b items-center justify-between"
          >
            <div className="w-[35%]">{item.name}</div>
            <div className="w-[35%]">{item.addedDate}</div>
            <div>{item.quantity}</div>
          </div>
        ))}
      </div>
    </>
  );
}
