import { createContext, useContext,useReducer } from 'react'
import {orderReducer} from "../reducer/reducer"
const initialState={
    orderAddress:{},
    orderPriceDetails:{
        totalOriginalPrice:0,
        totalDiscount:0,
        totalDeliveryCharge:0,
        totalAmount:0,
        totalSavedAmount:0
    },
    orderDetails:{}
}
const OrderContext=createContext()



const OrderProvider=({children})=>{
    const [orderState, orderDispatch] = useReducer(orderReducer, initialState)
    return <OrderContext.Provider value={{orderState,orderDispatch}}>
        {children}
    </OrderContext.Provider>
}

const useOrder=()=>useContext(OrderContext)

export {useOrder,OrderProvider}