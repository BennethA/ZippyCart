import Title from "../components/Title";
import { BiMoney } from "react-icons/bi";
import { BsPaypal } from "react-icons/bs";
import { SiVodafone } from "react-icons/si";
import { useContext, useState } from "react";
import { CgCreditCard } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DataContext from "../Context/DataContext";
import PaymentOption from "../components/Payment-Option";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const { logIn, cart, setCart, orders, setOrders } = useContext(DataContext);

  const paymentOptions = [
    {
      id: 1,
      name: "MTN Mobile Money",
      type: "mobile_money",
    },
    {
      id: 2,
      name: "Telecel Money",
      type: "mobile_money",
      logo: <SiVodafone className="text-[red]" />,
    },
    {
      id: 3,
      name: "Visa",
      type: "credit_card",
      logo: <CgCreditCard />,
    },
    {
      id: 4,
      name: "PayPal",
      type: "online_payment",
      logo: <BsPaypal className="text-[#2c2caa]" />,
    },
    {
      id: 5,
      name: "Cash on Delivery",
      type: "cod",
      logo: <BiMoney />,
    },
  ];

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePurchase = () => {
    if (!selectedPayment) return;

    if (!logIn) {
      navigate("/login");
    } else {
      // PAYMENT LOGIC
      const newOrder = {
        id: Date.now(),
        products: cart,
        date: new Date().toLocaleDateString(),
        total: cart.reduce((t, p) => t + p.price * p.quantity, 0) + 10,
      };

      const updatedOrders = [...orders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      setCart([]);

      navigate("/orders");
    }
  };

  const totalAmount =
    cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    ) + 10;

  return (
    <div className="px-4 sm:p-[5vw] md:px-[7vw] lg:px-[9vw] pt-[55px] gap-4 flex flex-col pb-10">
      <Title text1="PLACE" text2="ORDER" />
      <div className="text-xl font-semibold">Select Payment Option</div>
      <hr />
      <div className="flex gap-3 flex-wrap">
        {paymentOptions.map((option) => (
          <PaymentOption
            key={option.id}
            option={option}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-between items-center text-xl font-bold mt-5">
        <span>
          {cart.length} {cart.length > 1 ? "items" : "item"} • Total: $
          {totalAmount.toFixed(2)}
        </span>
      </div>
      <button
        disabled={!selectedPayment}
        onClick={handlePurchase}
        className={`border-2 px-6 py-2 rounded-md font-bold hover:bg-black hover:text-white transition dark:hover:bg-white dark:hover:text-black ${
          selectedPayment
            ? "hover:bg-black hover:text-white"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        PURCHASE
      </button>
    </div>
  );
}
