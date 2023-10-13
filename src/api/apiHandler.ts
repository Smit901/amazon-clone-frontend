import { axiosClient } from './apiClient';

export function userRegister (data){
	return axiosClient.post("api/auth/register", data);
}

