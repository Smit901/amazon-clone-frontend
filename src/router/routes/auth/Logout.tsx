import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// *** Custom Components or functions
import useUserContext from '../../../utility/hooks/useUserContext';
import { useDispatch } from 'react-redux';
import { emptyLocalCart } from '../../../redux/actions/cart';

function Logout() {
	const navigate = useNavigate();
	const { logout } = useUserContext();
	const dispatch = useDispatch();

	useEffect(() => {
		logout();
		dispatch(emptyLocalCart())
		localStorage.removeItem('token');
		window.history.replaceState(null, null, '/home');
		navigate('/home');
		// window.location.reload();
	}, [])

	return <></>
}

export default Logout;
