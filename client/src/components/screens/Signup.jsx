//client/src/components/screens/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import Alert from "../UI/Alert.js";
import "./css/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    acceptTerms: false,
    notification: false
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { signup, verifyEmailCode, resendCode } = useAuth(); // Asegúrate de incluir estas funciones

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Por favor ingrese un correo electrónico válido");
    }
  };

  
  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    // Validaciones individuales para mejor feedback
    if (formData.password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }
    
    if (!/[A-Z]/.test(formData.password)) {
      throw new Error("La contraseña debe tener al menos una mayúscula");
    }
    
    if (!/[a-z]/.test(formData.password)) {
      throw new Error("La contraseña debe tener al menos una minúscula");
    }
    
    if (!/\d/.test(formData.password)) {
      throw new Error("La contraseña debe tener al menos un número");
    }
    
    if (!/[@$!%*?&#\-_.]/.test(formData.password)) {
      throw new Error("La contraseña debe tener al menos un carácter especial (@$!%*?&#-_.)");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      throw new Error(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
      );
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (phone && !phoneRegex.test(phone)) {
      throw new Error("Por favor ingrese un número de teléfono válido");
    }
  };

  const validateAge = (birthDate) => {
    if (!birthDate) return;
    const age = Math.floor((new Date() - new Date(birthDate)) / 31557600000);
    if (age < 18) {
      throw new Error("Debes ser mayor de 18 años para registrarte");
    }
  };

  const handleNextStep = () => {
    try {
      if (step === 1) {
        if (!formData.firstName || !formData.lastName || !formData.email) {
          throw new Error("Por favor complete todos los campos obligatorios");
        }
        validateEmail(formData.email);
        setStep(2);
      } else if (step === 2) {
        validatePassword();
        validatePhone(formData.phoneNumber);
        validateAge(formData.birthDate);
        if (!formData.acceptTerms) {
          throw new Error("Debe aceptar los términos y condiciones");
        }
        handleSignup();
      }
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      setError("");
      setLoading(true);
      
      // Hacer la llamada real al backend para registro y envío de código
      await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
        notification: formData.notification
      });
      // ... código existente ...
    } catch (error) {
      setError(error.response?.data?.message || "Ocurrió un error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };


  const verifyEmail = async () => {
    try {
      setError("");
      setLoading(true);
      
      if (!verificationCode) {
        throw new Error("Por favor ingrese el código de verificación");
      }
      
      // Hacer la llamada real al backend para verificar el código
      await verifyEmailCode(formData.email, verificationCode);
      await signup(formData.email, formData.password);
      setSuccess("¡Cuenta verificada exitosamente!");
      setTimeout(() => navigate("/options"), 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || "Código de verificación inválido");
    } finally {
      setLoading(false);
    }
  };


const resendVerificationCode = async () => {
  try {
    setError("");
    setLoading(true);
    
    // Hacer la llamada real al backend para reenviar el código
    await resendCode(formData.email);
    // ... código existente ...
  } catch (error) {
    setError(error.response?.data?.message || "Error al reenviar el código");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="signup-container">
      <div className="signup-background"></div>
      
      <button
        className="back-button"
        onClick={() => step === 1 ? navigate("/") : setStep(1)}
        disabled={loading}
      >
        <i className="fas fa-arrow-left"></i>
        <span>{step === 1 ? 'Atrás' : 'Paso anterior'}</span>
      </button>

      <div className="signup-content">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        </div>

        <h2 className="signup-title">
          {showVerification ? 'Verificar correo' : 'Crear Cuenta'}
        </h2>

        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}

        {!showVerification ? (
          <form onSubmit={(e) => e.preventDefault()} className="signup-form">
            {step === 1 && (
              <div className="input-group">
                <div className="input-row">
                  <div className="input-container">
                    <i className="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre *"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      className="input-field"
                    />
                  </div>
                  <div className="input-container">
                    <i className="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellido *"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-container">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico *"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="input-field"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="input-group">
                <div className="input-container">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña *"
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
                    placeholder="Confirmar contraseña *"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="input-field"
                  />
                </div>

                <div className="input-container">
                  <i className="fas fa-phone input-icon"></i>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Número de teléfono"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={loading}
                    className="input-field"
                  />
                </div>

                <div className="input-container">
                  <i className="fas fa-calendar input-icon"></i>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    disabled={loading}
                    className="input-field"
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkmark"></span>
                    Acepto los términos y condiciones *
                  </label>

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="notification"
                      checked={formData.notification}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkmark"></span>
                    Deseo recibir notificaciones
                  </label>
                </div>

                <div className="password-requirements">
                  <p>La contraseña debe contener:</p>
                  <ul>
                    <li className={formData.password.length >= 8 ? 'valid' : ''}>
                      <i className={`fas fa-${formData.password.length >= 8 ? 'check' : 'times'}`}></i>
                      Mínimo 8 caracteres
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
                    <li className={/[@$!%*?&#\-_.]/.test(formData.password) ? 'valid' : ''}>
                      <i className={`fas fa-${/[@$!%*?&#\-_.]/.test(formData.password) ? 'check' : 'times'}`}></i>
                      Un carácter especial (@$!%*?&#-_.)
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <button
              type="button"
              className={`signup-button ${loading ? 'loading' : ''}`}
              onClick={handleNextStep}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Procesando...</span>
                </>
              ) : (
                step === 1 ? "Continuar" : "Crear cuenta"
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
        ) : (
          <div className="verification-container">
            <p className="verification-text">
              Hemos enviado un código de verificación a su correo electrónico.
              Por favor, ingréselo a continuación:
            </p>
            
            <div className="input-container verification-input">
              <i className="fas fa-key input-icon"></i>
              <input
                type="text"
                placeholder="Código de verificación"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={loading}
                className="input-field"
                maxLength="6"
              />
            </div>

            <button
              className={`signup-button ${loading ? 'loading' : ''}`}
              onClick={verifyEmail}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Verificando...</span>
                </>
              ) : (
                "Verificar código"
              )}
            </button>

            <button
              type="button"
              className="resend-button"
              onClick={resendVerificationCode}  // Cambiado de handleSignup a resendVerificationCode
              disabled={loading}
            >
              {loading ? "Reenviando..." : "Reenviar código"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;