import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useData } from "../../store/data/DataContext";
import { MdLocalOffer } from "react-icons/md";
import { useAuth } from "../../store/data/AuthContext";
import { useCart } from "../../store/data/CartContext";
import { useWishlist } from "../../store/data/WishlistContext";
import { addToCart, removeFromCart } from "../../services/CartServices";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../services/WishlistServices";
import { calculateDiscount } from "../../services/PriceServices";
import axios from "axios";

function SingleProduct() {
  const { data } = useData();
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useCart();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { token } = useAuth();
  const { productId } = useParams();

  const [product, setProduct] = useState({
    title: "",
    img: "",
    price: "",
    original_price: "",
    rating: 0,
    desc: "",
  });

  const { title, img, price, original_price, rating, desc, id } = product;
  

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data.product);
      } catch (error) {
        console.log("single page eroor", error);
      }
    })();
  }, [productId]);

  const addCartHandler = () => {
    if (token) {
      addToCart(token, product, cartDispatch);
      console.log(token, "single page");
    } else {
      navigate("/login");
    }
  };

  const addWishlistHandler = () => {
    if (token) {
      addToWishlist(token, product, wishlistDispatch);
    } else {
      navigate("/login");
    }
  };

  const removeWishlistHandler = () => {
    if (token) {
      removeFromWishlist(token, product, wishlistDispatch);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="single-product-cont">
      <div class="card-product-img-cont single-product-img-cont">
        <span className="offer-percentage">
          {Math.trunc(calculateDiscount(price, original_price))}%
        </span>
        <img src={img} alt={title} class="img-responsive" />
      </div>
      <div className="single-product-details">
        <div class="card-body single-card-body">
          <header class="card-header text-left">
            <h1>{title}</h1>
            <div class="price-container">
              <h5>
                RATING: {rating} <span class="font-light">(200)</span>
              </h5>
            </div>
            <div class="price-container">
              <h3>PRICE: {price}  </h3>
            </div>
          </header>
          <p className="card-desc text-left">
            {desc}
          </p>
        </div>
        <div class="card-btn-container">
          {wishlistState.wishlist.some(
            (wishlistItem) => wishlistItem.id === id
          ) ? (
            <button
              class="btn product-btn btn-s"
              onClick={() => removeWishlistHandler()}
            >
              Remove From Wishlist
            </button>
          ) : (
            <button
              class="btn product-btn btn-s"
              onClick={() => addWishlistHandler()}
            >
              Add To Wishlist
            </button>
          )}

          {cartState.cart.some((cartItem) => cartItem.id === id) ? (
            <button
              class="btn product-btn btn-s"
              onClick={() => navigate("/carts")}
            >
              Go To Cart
            </button>
          ) : (
            <button
              class="btn product-btn btn-s"
              onClick={() => addCartHandler()}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
