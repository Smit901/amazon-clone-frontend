import actionTypes from "../actions/actionTypes";

const initialStateAccount = {
  cart: [],
  totalPrice: 0,
  totalQty: 0,
  status: "", // success | loading | error
};

export default function cartReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case actionTypes.GET_CART:
      return {
        ...state,
        cart: action.payload.products,
        totalPrice: action.payload.totalPrice,  
        totalQty: action.payload.totalQty,
      };
    case actionTypes.ADD_CART:
      return {
        ...state,
        cart: action.payload.cartData,
        totalPrice: action.payload.totalPrice,
        totalQty: action.payload.totalQty
      };
    case actionTypes.REMOVE_CART:
      return {
        ...state,
        cart: action.payload.cartData,
        totalPrice: action.payload.totalPrice,
        totalQty: action.payload.totalQty
      };
    case actionTypes.UPDATE_CART:
      return {
        ...state,
        cart: action.payload.cartData,
        totalPrice: action.payload.totalPrice,
        totalQty: action.payload.totalQty
      };
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cart: [],
        totalPrice: 0,
        totalQty: 0
      };
    case actionTypes.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
