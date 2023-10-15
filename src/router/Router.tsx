import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/header/Header';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ProductList from './routes/product/ProductList';
import Footer from '../components/footer/Footer';
import Home from './routes/home/Home';
import Error from './routes/404/Error';
import Product from './routes/product/Product';
import Cart from './routes/cart/Cart';
import { AuthContext } from '../utility/context/AuthContext';
import Logout from './routes/auth/Logout';
import { getCart } from '../redux/actions/cart';
import { useDispatch } from "react-redux";

const Router = () => {
	const { login } = useContext(AuthContext);
	const dispatch = useDispatch();

	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			login(token);
			dispatch(getCart())
		}
	}, [])


	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					{!token ?
						<>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</>
						:
						<>
							<Route path="/logout" element={<Logout />} />
						</>
					}
					<Route path="/product" element={<ProductList />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/home" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/*" element={<Error />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default Router