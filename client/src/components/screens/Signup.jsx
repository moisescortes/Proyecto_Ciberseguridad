import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";

function Signup() {
	const navigate = useNavigate();

	const handleSignup = () => {
		navigate("/options"); // Redirect to Options Page
	};

	return (
		<div className="signup-container">
			<button className="back-button" onClick={() => navigate("/")}>
				Atras
			</button>
			<h2>Signup</h2>
			<form>
				<input type="text" placeholder="Nombre de usuario: " />
				<input type="password" placeholder="Contraseña" />
				<button type="button" onClick={handleSignup}>
					Crear cuenta
				</button>
			</form>
		</div>
	);
}

export default Signup;
