import React from 'react';
import useUserContext from '../../../utility/hooks/useUserContext';

const Home = () => {
	const { token, login, logout } = useUserContext();


	
	return (
		<div style={{ marginTop: "100px", height: "100vh" }}>
			<center>
				<h1>Welcome</h1>
			</center>
		</div>
	)
}

export default Home