import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { WishlistReducer } from "../reducer/reducer";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    
  const [wishlistState, wishlistDispatch] = useReducer(WishlistReducer, {
    wishlist: [],
  });

  return (
    <WishlistContext.Provider value={{ wishlistState, wishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);
export { useWishlist, WishlistProvider };
