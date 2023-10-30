import { axiosClient } from "./apiClient";

export function userRegister(data) {
  return axiosClient.post("api/auth/register", data);
}

export function userLogin(data) {
  return axiosClient.post("api/auth/login", data);
}

export function userForgotPassword(data) {
  return axiosClient.post("api/auth/forgotPassword", data);
}

export function userResetPassword(data) {
  return axiosClient.post("api/auth/resetPassword", data);
}

export function verifyToken(data) {
  return axiosClient.post("api/auth/verifyToken", data);
}

export function getProducts(data) {
  return axiosClient.get(
    `api/products?page=${data.page + 1}&productsPerPage=${
      data.rowsPerPage
    }&search=${data.search}`,
    data
  );
}

export function getSingleProduct(data) {
  return axiosClient.get(`api/products/${data.id}`, data);
}

export function getCartData(data) {
  return axiosClient.get("api/cart", data);
}

export function addCartData(data) {
  return axiosClient.post("api/cart/add", data);
}

export function removeCartData(data) {
  return axiosClient.post("api/cart/remove", data);
}

export function updateCartData(data) {
  return axiosClient.patch("api/cart/update", data);
}

export function removeAllCartData(data) {
  return axiosClient.delete("api/cart/removeAll", data);
}

export function getUserData(data) {
  return axiosClient.get("api/users/get-user", data);
}

export function placeOrder(data) {
  return axiosClient.post("/api/orders/place", data);
}

export function getOrders(data) {
  return axiosClient.get("/api/orders/history", data);
}
