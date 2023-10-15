const initialStateAccount = {
  cart: [],
  cartCount: 0,
};

export default function cartReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "cart":
      return {
        ...state,
      };
    case "cart/add":
      return { ...state };
    case "cart/remove":
      return {
        ...state,
      };
    case "cart/update":
      return {
        ...state,
      };
    default:
      return state;
  }
}
