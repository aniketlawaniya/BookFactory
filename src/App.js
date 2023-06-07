import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./containers/home/Home";
import ProductListing from "./components/productpage/productlisting/ProductListing";
import Navbar from "./containers/home/Navbar";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import Login from "./components/auth/Login";
import Mockman from "mockman-js";
import SignUp from "./components/auth/SignUp";
import Logout from "./components/auth/Logout";
import Footer from "./containers/home/Footer";
import SingleProduct from "./components/single-product/SingleProduct";
import Checkout from "./components/checkout/Checkout";
import OrderSummary from "./components/ordersummary/OrderSummary";
import { RequireAuth } from "./components/RequireAuth";
import { AuthRoute } from "./components/AuthRoute";
import { useAuth } from "./store/data";
import AddressModal from "./components/AddressModal";


function App() {
  const {modalOpen,editDetails,setOpenModal}=useAuth();
  return (
    <div className="App">
      {modalOpen && (
        <AddressModal
          editDetails={editDetails}
          onClose={() => setOpenModal(false)}
        />
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route element={<RequireAuth />}>
          <Route path="/carts" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer autoClose={3000} theme="colored" position="bottom-left" />
    </div>
  );
}

export default App;
