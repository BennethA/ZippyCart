import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navigations from "./components/Navigations";
import About from "./pages/About";
import ContactUs from "./pages/Contact-Us";
import ErrorPage from "./pages/Error-Page";
import Login from "./pages/Login";

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
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
