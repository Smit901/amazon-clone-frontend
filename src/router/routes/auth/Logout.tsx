import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../../../utility/hooks/useUserContext';

export default function Logout() {
	const navigate = useNavigate();
	const { logout } = useUserContext();

	useEffect(()=>{
		logout();
		localStorage.removeItem('token');
		navigate('/home');
	}, [])

	return;
}
