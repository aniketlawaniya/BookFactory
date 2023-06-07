import axios from "axios";
import { ACTION_TYPE } from "../store/Actions";

const addToWishlist = async (token, item, wishlistDispatch) => {
  try {
    const res = await axios.post(
      "/api/user/wishlist",
      {
        item,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    wishlistDispatch({type:ACTION_TYPE.ADD_TO_WISHLIST,payload:item})
  } catch (error) {
      console.log("error from add to wishlist ",error)
  }
};

const removeFromWishlist = async (token, item, wishlistDispatch) => {
  try {
    const res = await axios.delete(
      `/api/user/wishlist/:${item._id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    wishlistDispatch({type:ACTION_TYPE.REMOVE_FROM_WISHLIST,payload:item})
  } catch (error) {
      console.log("error from remove from wishlist ",error)
  }
};

export { addToWishlist ,removeFromWishlist};
