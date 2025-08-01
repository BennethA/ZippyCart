import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navigations from "./components/Navigations";
import About from "./pages/About";
import ContactUs from "./pages/Contact-Us";
import ErrorPage from "./pages/Error-Page";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgot-Password";
import UserInformation from "./pages/User-Information";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product-Information";
import PlaceOrder from "./pages/Place-Order";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white">
      <Navigations />
      <div
        className={`flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] h-full`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/userInformation" element={<UserInformation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productInformation/:id" element={<Product />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
