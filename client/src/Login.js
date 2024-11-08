import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/options'); // Redirect to Options Page
    };

    return (
        <div className="login-container">
            <button className="back-button" onClick={() => navigate('/')}>Atras</button>
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Nombre de usuario:" />
                <input type="password" placeholder="Contraseña:" />
                <button type="button" onClick={handleLogin}>Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
