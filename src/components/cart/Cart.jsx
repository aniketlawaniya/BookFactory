import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useCart, useAuth, useWishlist, useOrder } from "../../store/data";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPE } from "../../store/Actions";
import { removeFromCart, updateCartHandler } from "../../services/CartServices";
import {
  calculateTotalSummary,
  calculateDiscount,
} from "../../services/PriceServices";
import { addToWishlist } from "../../services/WishlistServices";

function Cart() {
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useCart();
  const { token } = useAuth();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { orderDispatch } = useOrder();

  const [totalSummary, setTotalSummary] = useState({
    totalOriginalPrice: 0,
    totalDiscount: 0,
    totalDeliveryCharge: 0,
    totalAmount: 0,
    totalSavedAmount: 0,
  });

  useEffect(() => {
    const data = calculateTotalSummary(cartState.cart);
    setTotalSummary(data);
  }, [cartState.cart]);

  const cartHandler = (item, type) => {
    if (token) {
      updateCartHandler(token, item, type, cartDispatch);
    }
  };

  const moveToWishlistHandler = (cartItem) => {
    addToWishlist(token, cartItem, wishlistDispatch);
    removeFromCart(token, cartItem, cartDispatch);
    toast.success("Item moved to Wishlist");
  };

  const removeCartHandler = (cartItem) => {
    removeFromCart(token, cartItem, cartDispatch);
    toast.success("Item removed from cart");
  };

  const cartCheckout = () => {
    navigate("/checkout");
    orderDispatch({ type: ACTION_TYPE.PRICE_DETAILS, payload: totalSummary });
  };
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      

      <div class="cart-container">
        <div class="cart-items-container">
          {cartState.cart.length > 0 ? (
            cartState.cart.map((cartItem) => {
              const {
                _id,
                id,
                img,
                original_price,
                price,
                qty,
                title,
                deliveryCharge,
              } = cartItem;
              return (
                <div class="cart-item card">
                  <div class="card-cont"></div>
                  <div class="card-img-body cart-img-body">
                    <div class="card-img-cont cart-img-cont" onClick={()=>navigate(`/product/${id}`)}>
                      <img
                        src={img}
                        alt=""
                        class="card-img-bd img-responsive"
                      />
                    </div>
                    <div class="card-body cart-body">
                      <header class="card-header">
                        <h3>
                          {title.length >= 15
                            ? `${title.substring(0, 13)}...`
                            : title}
                        </h3>
                        <h4>
                          &#8377; {price} &nbsp;{" "}
                          <span class="text-strike">
                            {" "}
                            &#8377;({original_price})
                          </span>{" "}
                          &nbsp;{" "}
                          <span>
                            (
                            {Math.trunc(
                              calculateDiscount(price, original_price)
                            )}
                            %)
                          </span>
                        </h4>
                        <h6 className="text-left">
                          {deliveryCharge
                            ? "Not Eligible For Free Delivery"
                            : "Eligible For Free Delivery"}
                        </h6>
                      </header>
                      <div class="quantity-container">
                        <h4>Quantity:</h4>
                        <div class="quantity-input">
                          <button
                            class="quantity-btn"
                            onClick={() =>
                              cartHandler(cartItem, ACTION_TYPE.DECR_QTY)
                            }
                            disabled={cartItem.qty > 1 ? false : true}
                          >
                            -
                          </button>
                          <span>{qty}</span>
                          <button
                            class="quantity-btn"
                            onClick={() =>
                              cartHandler(cartItem, ACTION_TYPE.INCR_QTY)
                            }
                            disabled={cartItem.qty >= 1 ? false : true}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-btn-container">
                    {wishlistState.wishlist.some(
                      (wishlistItem) => wishlistItem._id === cartItem._id
                    ) ? (
                      <button class="btn cart-btn btn-s" disabled={true}>
                        Already In Wishlist
                      </button>
                    ) : (
                      <button
                        class="btn cart-btn btn-s"
                        onClick={() => moveToWishlistHandler(cartItem)}
                        
                      >
                        Move To Wishlist
                      </button>
                    )}
                    <button
                      class="btn product-btn btn-s"
                      onClick={() => removeCartHandler(cartItem)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <h1>Cart is Empty</h1>
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
        {cartState.cart.length > 0 && (
          <>
            <div class="price-details">
              <h3 class="text-left">PRICE DETAILS</h3>
              <div class="divider-line"></div>
              <div class="charges">
                <div class="price charges-amt">
                  <p>Price({cartState.cart.length} items)</p>
                  <h3>&#8377;{totalSummary.totalOriginalPrice}</h3>
                </div>
                <div class="discount charges-amt">
                  <p>Discount</p>
                  <h3>-&#8377;{totalSummary.totalDiscount}</h3>
                </div>
                <div class="Delivery charges-amt">
                  <p>Delivery Charges</p>
                  <h3>&#8377;{totalSummary.totalDeliveryCharge}</h3>
                </div>
              </div>
              <div class="divider-line"></div>
              <div class="total charges-amt">
                <h3>TOTAL AMOUNT</h3>
                <h2>&#8377;{totalSummary.totalAmount}</h2>
              </div>
              <div class="divider-line"></div>
            </div>
            <div className="checkout">
              <p>
                You will save &#8377; {totalSummary.totalSavedAmount} on this
                order
              </p>
              <button class="btn cart-btn btn-s order-btn" onClick={()=>cartCheckout()}>CHECKOUT</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
