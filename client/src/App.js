import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Home from "./Home.js";
import Login from "./components/screens/Login.jsx";
import Signup from "./components/screens/Signup.jsx";
import OptionsPage from "./OptionsPage.js";
import ProfileOptionsPage from "./ProfileOptionsPage.js";
import EditProfilePage from "./EditProfilePage.js";
import EmployeeListPage from "./EmployeeListPage.js";
import JobOffersPage from "./JobOffersPage.js";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/options"
						element={
							<PrivateRoute>
								<OptionsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/hacer-perfil"
						element={
							<PrivateRoute>
								<ProfileOptionsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/make-edit-profile"
						element={
							<PrivateRoute>
								<EditProfilePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/buscar-empleado"
						element={
							<PrivateRoute>
								<EmployeeListPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/look-at-offers"
						element={
							<PrivateRoute>
								<JobOffersPage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
