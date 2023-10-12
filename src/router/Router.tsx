import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/header/Header';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ProductList from './routes/product/ProductList';
import Footer from '../components/footer/Footer';


const Router = () => {

	if (false) {
		return (
				<div className="App">
						<BrowserRouter basename={"/admin"}>
								<Routes>
										{/* <Route path="/" element={<Login />} /> */}
										{/* <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
								</Routes>
						</BrowserRouter>
				</div>
		);
} else {
		return (
				<>
						<BrowserRouter>
								<Header />
								<Routes>
										<Route path="/login" element={<Login />} />
										<Route path="/register" element={<Register />} />
										<Route path="/product" element={<ProductList />} />
										<Route path="/home" element={<Register />} />
								</Routes>
								<Footer />
						</BrowserRouter>
				</>
		);
}

}

export default Router