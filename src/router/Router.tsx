import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import { getCart } from '../redux/actions/cart';
import MyOrder from './routes/myorder/MyOrder';
import ForgotPassword from './routes/auth/ForgotPassword';
import ResetPassword from './routes/auth/ResetPassword';
import { verifyToken } from '../api/apiHandler';
import useUserContext from '../utility/hooks/useUserContext';

const Router = () => {
	const { token, login } = useUserContext();
	const dispatch = useDispatch();

	const localToken = localStorage.getItem('token');

	useEffect(() => {
		if (localToken) {
			verifyToken({ token: localToken }).then(res => {
				if (res.data.status) {
					login(localToken);
					dispatch(getCart())
				}
			}).catch(err => {})
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
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/reset-password" element={<ResetPassword />} />
						</>
						:
						<>
							<Route path="/orders" element={<MyOrder />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/logout" element={<Logout />} />
						</>
					}
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/product" element={<ProductList />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/home" element={<Dashboard />} />
					<Route path="/*" element={<Error />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default Router