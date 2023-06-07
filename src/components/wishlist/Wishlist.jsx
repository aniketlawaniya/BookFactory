import React from "react";
import {toast} from 'react-toastify'
import { useWishlist } from "../../store/data/WishlistContext";
import { useCart } from "../../store/data/CartContext";
import { useAuth } from "../../store/data/AuthContext";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPE } from "../../store/Actions";
import { removeFromWishlist } from "../../services/WishlistServices";
import { addToCart, updateCartHandler } from "../../services/CartServices";

function Wishlist() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartState, cartDispatch } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const moveToCartHandler = (wishlistItem) => {
    
    addToCart(token, wishlistItem, cartDispatch);
    removeFromWishlist(token, wishlistItem, wishlistDispatch);
    toast.success("Item Moved to Cart")
  };

  
 
  return (
    <div>
      <h1 class="text-center cart-heading">MY WISHLIST</h1>
      <div class="wishlist-container">
        {wishlistState.wishlist.length > 0 ? (
          wishlistState.wishlist.map((wishlistItem) => {
            const { img, price, original_price, title, _id } = wishlistItem;
            return (
              <div class="card-wishlist" key={_id}>
                <div class="wishlist-img-cont">
                  <img src={img} alt="" class="card-img img-responsive" />
                </div>
                <div class="card-body">
                  <header class="card-header">
                    <h6>{title}</h6>
                    <h4>
                      &#8377;{price} &nbsp;{" "}
                      <span class="text-strike">&#8377;{original_price}</span>
                    </h4>
                  </header>
                </div>
                <div class="card-footer wishlist-footer">
                  <button
                    class="btn wishlist-btn btn-s"
                    onClick={() =>
                      wishlistDispatch({
                        type: ACTION_TYPE.REMOVE_FROM_WISHLIST,
                        payload: wishlistItem,
                      })
                    }
                  >
                    Remove From Wishlist
                  </button>
                  {
                    cartState.cart.some((cartItem)=>cartItem._id===wishlistItem._id)?(
                      <button
                    class="btn wishlist-btn btn-s" disabled={true} 
                  >
                    Already In Cart
                  </button>
                    ):( 
                  <button
                    class="btn wishlist-btn btn-s"
                    onClick={() => moveToCartHandler(wishlistItem)}
                  >
                    Move To Cart
                  </button>
                      )
                  }
                </div>
              </div>
            );
          })
        ) : (
          <>
            <h1>wishlist is empty</h1>
            <div class="card-btn-container">
              <button
                class="btn cart-btn btn-s"
                onClick={() => navigate("/products")}
              >
                Go To Products
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;