import { AxiosRequestConfig } from 'axios';
import { axiosClient } from "./apiClient";

export function userRegister(data: { firstName: string; lastName: string; email: string; password: string; }) {
  return axiosClient.post("api/auth/register", data);
}

export function userLogin(data: { email: string; password: string; }) {
  return axiosClient.post("api/auth/login", data);
}

export function userForgotPassword(data: { email: string; }) {
  return axiosClient.post("api/auth/forgotPassword", data);
}

export function userResetPassword(data: { id: undefined; password: string; }) {
  return axiosClient.post("api/auth/resetPassword", data);
}

export function verifyToken(data: { token: string | null; }) {
  return axiosClient.post("api/auth/verifyToken", data);
}

export function getProducts(data: AxiosRequestConfig<any> | undefined) {
  return axiosClient.get(
    `api/products?page=${data.page + 1}&productsPerPage=${
      data.rowsPerPage
    }&search=${data.search}`,
    data
  );
}

export function getSingleProduct(data: AxiosRequestConfig<any> | undefined) {
  return axiosClient.get(`api/products/${data.id}`, data);
}

export function getCartData(data: AxiosRequestConfig<any> | undefined) {
  return axiosClient.get("api/cart", data);
}

export function addCartData(data: { ProductId: number; quantity: number; }) {
  return axiosClient.post("api/cart/add", data);
}

export function removeCartData(data: any) {
  return axiosClient.post("api/cart/remove", data);
}

export function updateCartData(data: any) {
  return axiosClient.patch("api/cart/update", data);
}

export function removeAllCartData(data: AxiosRequestConfig<any> | undefined) {
  return axiosClient.delete("api/cart/removeAll", data);
}

export function getUserData(data: AxiosRequestConfig<any> | undefined) {
  return axiosClient.get("api/users/get-user", data);
}

export function placeOrder(data: { shipping: { street: string; city: string; zipCode: string; }; paymentMethod: string; }) {
  return axiosClient.post("/api/orders/place", data);
}

export function getOrders(data: AxiosRequestConfig<any> | undefined) {
  return axiosClient.get("/api/orders/history", data);
}
