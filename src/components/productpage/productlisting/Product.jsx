import React from "react";
import {toast} from 'react-toastify'
import { useAuth } from "../../../store/data/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../store/data/CartContext";
import { useWishlist } from "../../../store/data/WishlistContext";
import { addToCart, removeFromCart } from "../../../services/CartServices";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../services/WishlistServices";
import { calculateDiscount } from "../../../services/PriceServices";

function Product({ item }) {
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useCart();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { token } = useAuth();
  const {
    _id,
    id,
    title,
    img,
    price,
    original_price,
    isPopular,
    rating,
    categoryName,
  } = item;

  const addCartHandler = () => {
    if (token) {
      addToCart(token, item, cartDispatch);
      toast.success("Item added to Cart")
    } else {
      navigate("/login");

    }
  };


  const addWishlistHandler = () => {
    if (token) {
      addToWishlist(token, item, wishlistDispatch);
      toast.success("Item added to Wishlist")
    } else {
      navigate("/login");
    }
  };

  const removeWishlistHandler = () => {
    if (token) {
      removeFromWishlist(token, item, wishlistDispatch);
      toast.success("Item removed to Wishlist")
    } else {
      navigate("/login");
    }
  };

  return (
    <div class="card card-product">
      <div class="card-img-body card-product-body">
        <Link to={`/product/${id}`}>
        <div class="card-product-img-cont">
          <span className="offer-percentage">
                  {Math.trunc(calculateDiscount(price, original_price))}%
          </span>
          <img src={img} alt="" class="card-img-bd img-responsive" />
        </div>
        </Link>
        <div class="card-body">
          <header class="card-header">
            <h4 className="text-center">{title}</h4>
            <div class="price-container">
              <h5>
                RATING: {rating}
              </h5>
            </div>
            <div class="price-container">
              <h4>
                PRICE: {price} <span style={{textDecoration: "line-through"}}>{original_price}</span>
              </h4>
            </div>
          </header>
        </div>
      </div>
      <div class="card-btn-container">

        {wishlistState.wishlist.some(
          (wishlistItem) => wishlistItem._id === item._id
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

        {cartState.cart.some((cartItem) => cartItem._id === item._id) ? (
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
  );
}

export { Product };
