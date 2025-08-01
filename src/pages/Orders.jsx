import { useContext } from "react";
import Title from "../components/Title";
import DataContext from "../Context/DataContext";
import CartLink from "../components/Cart-Link";

export default function Orders() {
  // Get orders from DataContext
  const { orders } = useContext(DataContext);

  return (
    <>
      <CartLink />
      <div className="px-4 sm:p-[5vw] md:px-[7vw] lg:px-[9vw] pt-[55px] pb-7">
        <Title text1="YOUR" text2="ORDERS" />

        {orders?.length > 0 ? (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border p-4 rounded-lg flex flex-col gap-2"
              >
                <div className="flex justify-between items-center font-bold">
                  <p>Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600 dark:text-[#c0c0c0]">
                    {order.date}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between border-b pb-1"
                    >
                      <p className="w-1/2">{product.name}</p>
                      <p>Qty: {product.quantity}</p>
                      <p>${(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="font-bold text-right">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="font-bold text-center mt-5">
            You have no orders yet.
          </div>
        )}
      </div>
    </>
  );
}
