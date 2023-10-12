import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/header/Header';
import Login from './routes/auth/Login';


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
										{/* <Route path="/changePassword" element={<ChangePassword />} /> */}
								</Routes>
						</BrowserRouter>
				</>
		);
}

}

export default Router