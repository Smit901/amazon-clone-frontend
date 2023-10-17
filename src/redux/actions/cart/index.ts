import actionTypes from "../actionTypes";
import {
  addCartData,
  getCartData,
  removeAllCartData,
  removeCartData,
  updateCartData,
} from "../../../api/apiHandler";
import { showNotification } from "../../../utility/showNotification";

export function getCart() {
  return async function (dispatch, getState) {
    dispatch({ type: actionTypes.CHANGE_STATUS, payload: "loading" });
    getCartData({}).then((res) => {
      if (res.data.status) {
        dispatch({ type: actionTypes.CHANGE_STATUS, payload: "success" });
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

export function addCart({ data, qty }) {
  let totalPrice;
  let totalQty;
  let cartData;
  return async function (dispatch, getState) {
    const result = getState().cart.cart.find(
      (val) => val.product_id === data.id
    );
    totalQty = getState().cart.totalQty + qty;
    if (result) {
      totalPrice = getState().cart.totalPrice + result.price_per_unit * qty;
      cartData = getState().cart.cart.map((val) =>
        val.product_id === data.id
          ? { ...val, quantity: val.quantity + qty }
          : val
      );
    } else {
      const product = {
        product_id: data.id,
        product_name: data.name,
        product_image: data.image,
        quantity: qty,
        price_per_unit: data.price,
      };
      totalPrice = getState().cart.totalPrice + data.price * qty;
      cartData = [...getState().cart.cart, product];
    }

    dispatch({ type: actionTypes.CHANGE_STATUS, payload: "loading" });
    addCartData({
      ProductId: data.id,
      quantity: qty,
    })
      .then((res) => {
        if (res.data.status) {
          showNotification({
            icon: "success",
            title: res.data.msg,
          });
          dispatch({ type: actionTypes.CHANGE_STATUS, payload: "success" });
          dispatch({
            type: actionTypes.ADD_CART,
            payload: { cartData, totalPrice, totalQty },
          });
        }
      })
      .catch((err) => {
        showNotification({
          icon: "error",
          title: err.response.data.msg,
        });
      });
  };
}

export function removeCart(data) {
  let totalPrice;
  let totalQty;
  let cartData;

  return async function (dispatch, getState) {
    const result = getState().cart.cart.find(
      (val) => val.product_id === data.ProductId
    );
    if (result) {
      totalQty = getState().cart.totalQty - result.quantity;
      totalPrice =
        getState().cart.totalPrice - result.price_per_unit * result.quantity;
      cartData = getState().cart.cart.filter(
        (val) => val.product_id !== data.ProductId
      );
    }

    removeCartData(data).then((res) => {
      if (res.data.status) {
        showNotification({
          icon: "success",
          title: res.data.msg,
        });
        dispatch({
          type: actionTypes.REMOVE_CART,
          payload: { cartData, totalPrice, totalQty },
        });
      }
    });
  };
}

export function updateCart(data) {
  let totalPrice;
  let totalQty;
  let cartData;

  return async function (dispatch, getState) {
    const result = getState().cart.cart.find(
      (val) => val.product_id === data.ProductId
    );
    if (result) {
      if (data.quantity > 0) {
        if (result.quantity > data.quantity) {
          totalQty = getState().cart.totalQty - 1;
          totalPrice = getState().cart.totalPrice - result.price_per_unit;
        } else {
          totalQty = getState().cart.totalQty + 1;
          totalPrice = getState().cart.totalPrice + result.price_per_unit;
        }

        cartData = getState().cart.cart.map((val) =>
          val.product_id === data.ProductId
            ? { ...val, quantity: data.quantity }
            : val
        );
      }
    }

    if (data.quantity > 0) {
      updateCartData(data).then((res) => {
        if (res.data.status) {
          showNotification({
            icon: "success",
            title: res.data.msg,
          });
          dispatch({
            type: actionTypes.UPDATE_CART,
            payload: { cartData, totalPrice, totalQty },
          });
        }
      });
    }
  };
}

export function emptyCart() {
  return async function (dispatch, getState) {
    removeAllCartData({}).then((res) => {
      if (res.data.status) {
        showNotification({
          icon: "success",
          title: res.data.msg,
        });
        dispatch({
          type: actionTypes.EMPTY_CART,
        });
      }
    });
  };
}

export function emptyLocalCart() {
  return {
    type: actionTypes.EMPTY_CART,
  };
}
