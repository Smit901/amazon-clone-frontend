import React, {useEffect} from 'react';
import useUserContext from '../../../utility/hooks/useUserContext';
import { useDispatch } from 'react-redux';
import { getCart } from '../../../redux/actions/cart';

const Home = () => {
	const { token, login, logout } = useUserContext();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCart())
	}, [])


	return (
		<div style={{ marginTop: "100px", height: "100vh" }}>
			<center>
				<h1>Welcome</h1>
			</center>
		</div>
	)
}

export default Home