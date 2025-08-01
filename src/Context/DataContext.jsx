import { BsTwitterX } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa6";
import { createContext, useEffect, useState } from "react";
const DataContext = createContext({});

export function DataProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState("");
  const [filter, setFilter] = useState("All");
  const [logIn, setLogIn] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [prevPageNumber, setPrevPageNumber] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(15);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  const storedCart = localStorage.getItem("cart");
  const existingCart = storedCart ? JSON.parse(storedCart) : [];

  const handleItem = (item) => {
    let existingItem = cart.find((product) => product.id === item.id);

    if (existingItem) {
      handleDelete(item);
    } else {
      const newItem = {
        ...item,
        addedDate:
          new Date().toDateString() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes(),
      };
      const newCart = [...cart, newItem];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    }
  };

  const handleDelete = (item) => {
    const updatedCart = cart.filter((cart) => cart.id !== item.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const socials = [
    {
      id: 1,
      link: "http://wa.me/0539540191",
      icon: <FaWhatsapp />,
      name: "Whatsapp",
    },
    {
      id: 2,
      link: "http://www.twitter.com/dev_roi",
      icon: <BsTwitterX />,
      name: "Twitter",
    },
    {
      id: 3,
      link: "mailto:addobenneth6@gmail.com",
      icon: <BiLogoGmail />,
      name: "GMAIL",
    },
  ];

  const categories = [
    {
      name: "All",
    },
    {
      name: "Male",
    },
    {
      name: "Female",
    },
    {
      name: "Perfume",
    },
    {
      name: "Accessories",
    },
    {
      name: "Shorts",
    },
    {
      name: "Winterwear",
    },
    {
      name: "Pants",
    },
    {
      name: "Pajamas",
    },
    {
      name: "Socks",
    },
    {
      name: "Skirts",
    },
    {
      name: "Swimwear",
    },
    {
      name: "Outerwear",
    },
    {
      name: "Jeans",
    },
    {
      name: "Clothing",
    },
    {
      name: "Footwear",
    },
    {
      name: "Gown",
    },
  ];
  // localStorage.clear()
  return (
    <DataContext.Provider
      value={{
        orders,
        setOrders,
        userInfo,
        setUserInfo,
        socials,
        logIn,
        setLogIn,
        filter,
        setFilter,
        cart,
        setCart,
        handleDelete,
        handleItem,
        existingCart,
        darkMode,
        setDarkMode,
        categories,
        openSearch,
        setOpenSearch,
        openPurchase,
        setOpenPurchase,
        errors,
        setErrors,
        prevPageNumber,
        setPrevPageNumber,
        nextPageNumber,
        setNextPageNumber,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
