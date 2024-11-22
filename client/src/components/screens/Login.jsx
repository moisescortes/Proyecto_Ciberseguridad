//client/src/components/screens/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { auth } from "../../firebase.js";
import Alert from "../UI/Alert.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/options");
    } catch (error) {
      setError(
        error.code === "auth/invalid-credential"
          ? "Credenciales inválidas. Por favor, verifica tu email y contraseña."
          : "Ha ocurrido un error. Por favor, intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/options");
    } catch (error) {
      setError("Error al iniciar sesión con Google. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <button className="back-button" onClick={() => navigate("/")}>
        <i className="fas fa-arrow-left"></i>
        <span>Atrás</span>
      </button>

      <div className="login-content">
        <h2>Iniciar Sesión</h2>

        {error && <Alert type="error" children={error} />}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-envelope input-icon"></i>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-lock input-icon"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
                className="input-field"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          <div className="divider">
            <span>o</span>
          </div>

          <button
            type="button"
            className="google-button"
            onClick={handleGoogleSignIn}
          >
            <i className="fab fa-google"></i>
            <span>Iniciar sesión con Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;