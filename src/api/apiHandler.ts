import { axiosClient } from './apiClient';

export function userRegister (data){
	return axiosClient.post("api/auth/register", data);
}

export function userLogin (data){
	return axiosClient.post("api/auth/login", data);
}

export function getProducts (data){
	return axiosClient.get(`api/products?page=${data.page}&productsPerPage=${data.rowsPerPage}`, data);
}

export function getSingleProduct (data){
	return axiosClient.get(`api/products/${data.id}`, data)
}
