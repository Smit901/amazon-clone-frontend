import { axiosClient } from './apiClient';

export function userRegister (data){
	return axiosClient.post("api/auth/register", data);
}

export function userLogin (data){
	return axiosClient.post("api/auth/login", data);
}
