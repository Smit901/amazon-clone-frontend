import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/header/Header';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';


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
										<Route path="/product" element={<Register />} />
										<Route path="/home" element={<Register />} />
								</Routes>
						</BrowserRouter>
				</>
		);
}

}

export default Router