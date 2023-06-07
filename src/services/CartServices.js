import axios from "axios";
import Wishlist from "../components/wishlist/Wishlist";
import { ACTION_TYPE } from "../store/Actions";
import { useCart } from "../store/data/CartContext";

// const {cartDispatch} =useCart();

const addToCart = async (token, item,cartDispatch) => {
  try {
    const res = await axios.post(
      "/api/user/cart",
      {
        item,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    cartDispatch({type:ACTION_TYPE.ADD_TO_CART,payload:item});
  } catch (error) {
      console.log("error in add to cart",error)
  }
};

const removeFromCart = async (token, item,cartDispatch) => {
  try {
    const res = await axios.delete(
        `/api/user/cart/:${item._id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    cartDispatch({type:ACTION_TYPE.REMOVE_FROM_CART,payload:item});
  } catch (error) {
      console.log("error in remove from cart",error)
  }
};

const updateCartHandler = async (token, item,actionType,cartDispatch) => {
  try {
    const res = await axios.post(
        `/api/user/cart/:${item._id}`,
      {
        action: {
          type: actionType===ACTION_TYPE.INCR_QTY?"increment":"decrement"
        },
      },
      {
        headers: {
            authorization: token,
          },
      }
    );
    console.log(actionType,item)
    cartDispatch({type:actionType,payload:item})
  } catch (error) {
      console.log("error in update from cart",error)
  }
};

const clearCart=(token,carts,cartDispatch)=>{
  carts.forEach(async(item)=>{
    try {
      const res = await axios.delete(
          `/api/user/cart/:${item._id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(res)
      res.status===200 && cartDispatch({type:ACTION_TYPE.CLEAR_CART,payload:[]});
    } catch (error) {
        console.log("error in remove from cart",error)
    }
  })
}



export { addToCart,removeFromCart,updateCartHandler,clearCart };
