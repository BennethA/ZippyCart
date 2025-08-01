import { Link } from 'react-router-dom'
import DataContext from '../Context/DataContext';
import { useContext } from 'react';

const OrdersLink = () => {
  const { logIn } = useContext(DataContext);
  return (
    <Link
      to={logIn ? "/orders" : "/login"}
      className="z-50 fixed top-[120px] right-4 sm:right-[5vw] md:right-[7vw] lg:right-[9vw] p-2 flex items-center gap-2 rounded-sm ml-4 transition-all duration-200 hover:opacity-80 bg-[#6d6d6d] font-semibold outline-none text-white"
    >
      Orders
    </Link>
  );
}

export default OrdersLink