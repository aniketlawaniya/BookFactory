import axios from "axios";
import { createContext, useContext, useEffect, useState ,useReducer} from "react";
import { CartReducer } from "../reducer/reducer";

const CartContext=createContext();


const CartProvider=({children})=>{
    const [cartState, cartDispatch] = useReducer(CartReducer,{
        cart:[]
    })

    return (
        <CartContext.Provider value={{cartState,cartDispatch}}>
            {children}
        </CartContext.Provider>
    )
}

const useCart=()=>useContext(CartContext);
export {useCart,CartProvider}