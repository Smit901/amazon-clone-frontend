import actionTypes from "../actionTypes";
import { getCartData } from "../../../api/apiHandler";

export function getCart() {
  return async function (dispatch, getState) {
    dispatch({ type: actionTypes.CHANGE_STATUS, payload: 'loading'})
    getCartData({}).then((res) => {
      if (res.data.status) {
        dispatch({ type: actionTypes.CHANGE_STATUS, payload: 'success'})
        dispatch({
          type: actionTypes.GET_CART,
          payload: {
            products: res.data.data.cart_items,
            totalPrice: res.data.data.total_price,
            totalQty: res.data.data.total_quantity,
          },
        });
      }
    });
  };
}
