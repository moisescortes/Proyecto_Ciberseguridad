//client/src/components/screens/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import Alert from "../UI/Alert.js";
import "./css/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      throw new Error(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número"
      );
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      if (!formData.username || !formData.password) {
        throw new Error("Por favor complete todos los campos");
      }

      validatePassword();
      await signup(formData.username, formData.password);
      navigate("/options");
    } catch (error) {
      setError(error.message || "Ocurrió un error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background"></div>
      
      <button
        className="back-button"
        onClick={() => navigate("/")}
        disabled={loading}
      >
        <i className="fas fa-arrow-left"></i>
        <span>Atrás</span>
      </button>

      <div className="signup-content">
        <h2 className="signup-title">Crear Cuenta</h2>

        {error && <Alert type="error">{error}</Alert>}

        <form onSubmit={handleSignup} className="signup-form">
          <div className="input-group">
            <div className="input-container">
              <i className="fas fa-envelope input-icon"></i>
              <input
                type="email"
                name="username"
                placeholder="Correo electrónico"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                required
                className="input-field"
              />
            </div>

            <div className="input-container">
              <i className="fas fa-lock input-icon"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
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

            <div className="input-container">
              <i className="fas fa-lock input-icon"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="password-requirements">
            <p>La contraseña debe contener:</p>
            <ul>
              <li className={formData.password.length >= 6 ? 'valid' : ''}>
                <i className={`fas fa-${formData.password.length >= 6 ? 'check' : 'times'}`}></i>
                Mínimo 6 caracteres
              </li>
              <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                <i className={`fas fa-${/[A-Z]/.test(formData.password) ? 'check' : 'times'}`}></i>
                Una mayúscula
              </li>
              <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                <i className={`fas fa-${/[a-z]/.test(formData.password) ? 'check' : 'times'}`}></i>
                Una minúscula
              </li>
              <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                <i className={`fas fa-${/\d/.test(formData.password) ? 'check' : 'times'}`}></i>
                Un número
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className={`signup-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Creando cuenta...</span>
              </>
            ) : (
              "Crear cuenta"
            )}
          </button>

          <p className="login-link">
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              className="text-button"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Inicia sesión
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;