import { ACTION_TYPE } from "../Actions";

const initialState={
  cart: [],
  wishlist: [],
  address: [],
}

const DataReducer=(state,action)=>{
  switch (action.type) {
    case ACTION_TYPE.ADD_ADDRESS:
      return {...state,address:action.payload}
    case ACTION_TYPE.DELETE_ADDRESS:
      return {...state,address:action.payload}
    case ACTION_TYPE.EDIT_ADDRESS:
      return {...state,address:action.payload}
    default:
      break;
  }
}

const ProductReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SEARCH:
      return { ...state, search: action.payload };
    case ACTION_TYPE.SORT_TYPE:
      return { ...state, sort: action.payload };
    case ACTION_TYPE.CATEGORY:
      return state.category.includes(action.payload)
        ? {
            ...state,
            category: state.category.filter((item) => item !== action.payload),
          }
        : { ...state, category: [...state.category, action.payload] };
    case ACTION_TYPE.RANGE:
      return { ...state, range: action.payload };
    case ACTION_TYPE.RATE:
      return { ...state, rating: action.payload };
    case ACTION_TYPE.RESET:
      return { ...state, sort: "", category: [], range: "", rating: "" };
    default:
      return state;
  }
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TO_CART:
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case ACTION_TYPE.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((cart) => cart._id !== action.payload._id),
      };
    case ACTION_TYPE.CLEAR_CART:
      
      return {
        ...state,
        cart: action.payload,
      };
    case ACTION_TYPE.DECR_QTY:
      return {
        ...state,
        cart: state.cart.filter((item) =>
          item._id === action.payload._id
            ? (item.qty = action.payload.qty-1)
            : item.qty
        ),
      };
    case ACTION_TYPE.INCR_QTY:
      
      return {
        ...state,
        cart: state.cart.filter((item) =>
          item._id === action.payload._id
            ? (item.qty = action.payload.qty+1)
            : item.qty
        ),
      };
    default:
      return state;
  }
};

const WishlistReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TO_WISHLIST:
      return { ...state, wishlist: [...state.wishlist, { ...action.payload }] };
    case ACTION_TYPE.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishlist) => wishlist._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.PRICE_DETAILS:
      const {
        totalOriginalPrice,
        totalDiscount,
        totalDeliveryCharge,
        totalAmount,
        totalSavedAmount,
      } = action.payload;
      return {
        ...state,
        orderPriceDetails: {
          ...state.orderPriceDetails,
          totalOriginalPrice,
          totalDiscount,
          totalDeliveryCharge,
          totalAmount,
          totalSavedAmount,
        },
      };
    case ACTION_TYPE.ADDRESS_DETAILS:
      return { ...state, orderAddress: { ...action.payload } };
    case ACTION_TYPE.ORDER_COMPLETE:
      return {...state,orderDetails:{...action.payload}}
    default:
      return state;
  }
};

export { initialState,ProductReducer,DataReducer, CartReducer, WishlistReducer, orderReducer };
