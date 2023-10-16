import { axiosClient } from './apiClient';

const config = {
	headers: {
			'authorization': localStorage.getItem('token'),
			'accept-language': 'en',
	},
}

export function userRegister (data){
	return axiosClient.post("api/auth/register", data);
}

export function userLogin (data){
	return axiosClient.post("api/auth/login", data);
}

export function getProducts (data){
	return axiosClient.get(`api/products?page=${data.page+1}&productsPerPage=${data.rowsPerPage}&search=${data.search}`, data);
}

export function getSingleProduct (data){
	return axiosClient.get(`api/products/${data.id}`, data)
}

export function getCartData (data){
	return axiosClient.get('api/cart', data, config)
}

export function addCartData (data){
	return axiosClient.post('api/cart/add', data , config)
}

export function removeCartData (data){
	return axiosClient.post('api/cart/remove', data , config)
}

export function updateCartData (data){
	return axiosClient.patch('api/cart/update', data, config)
}
