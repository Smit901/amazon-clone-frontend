import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// *** Custom Components or functions
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import Home from './routes/home/Home';
import ProductList from './routes/product/ProductList';
import Product from './routes/product/Product';
import Cart from './routes/cart/Cart';
import Error from './routes/404/Error';
import Logout from './routes/auth/Logout';
import Dashboard from './routes/dashboard/Dashboard';
import { AuthContext } from '../utility/context/AuthContext';
import { getCart } from '../redux/actions/cart';
import MyOrder from './routes/myorder/MyOrder';

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
							<Route path="/orders" element={<MyOrder />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/logout" element={<Logout />} />
						</>
					}
					<Route path="/product" element={<ProductList />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/home" element={<Home />} />
					<Route path="/*" element={<Error />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default Router