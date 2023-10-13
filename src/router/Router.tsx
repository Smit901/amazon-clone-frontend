import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/header/Header';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ProductList from './routes/product/ProductList';
import Footer from '../components/footer/Footer';
import Home from './routes/home/Home';
import Error from './routes/404/Error';
import Product from './routes/product/Product';

const Router = () => {
		return (
				<>
						<BrowserRouter>
								<Header />
								<Routes>
										<Route path="/login" element={<Login />} />
										<Route path="/register" element={<Register />} />
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