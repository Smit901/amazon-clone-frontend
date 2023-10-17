import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../../../utility/hooks/useUserContext';
import { useDispatch } from 'react-redux';
import { emptyLocalCart } from '../../../redux/actions/cart';

export default function Logout() {
	const navigate = useNavigate();
	const { logout } = useUserContext();
	const dispatch = useDispatch();

	useEffect(() => {
		logout();
		dispatch(emptyLocalCart())
		localStorage.removeItem('token');
		navigate('/home');
		window.location.reload();
	}, [])

	return;
}
