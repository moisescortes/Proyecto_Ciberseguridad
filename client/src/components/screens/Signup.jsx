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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { signup, login, resendCode } = useAuth();
  const [passwordErrors, setPasswordErrors] = useState([]);

  const checkPasswordInRealTime = (password) => {
    const errors = [];
    
    if (password.length < 8) errors.push("length");
    if (!/[A-Z]/.test(password)) errors.push("uppercase");
    if (!/[a-z]/.test(password)) errors.push("lowercase");
    if (!/\d/.test(password)) errors.push("number");
    if (!/[@$!%*?&#\-_.]/.test(password)) errors.push("special");
    
    setPasswordErrors(errors);
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  
    if (name === 'password') {
      checkPasswordInRealTime(value);
    }
  };

  const validateForm = () => {
    const errors = [];

    // First step validation
    if (step === 1) {
      if (!formData.firstName) errors.push("Nombre es requerido");
      if (!formData.lastName) errors.push("Apellido es requerido");
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push("Correo electrónico inválido");
      }
    }

    // Second step validation
    if (step === 2) {
      const passwordValidationErrors = [];
      
      if (formData.password.length < 8) {
        passwordValidationErrors.push("Mínimo 8 caracteres");
      }
      if (!/[A-Z]/.test(formData.password)) {
        passwordValidationErrors.push("Al menos una mayúscula");
      }
      if (!/[a-z]/.test(formData.password)) {
        passwordValidationErrors.push("Al menos una minúscula");
      }
      if (!/\d/.test(formData.password)) {
        passwordValidationErrors.push("Al menos un número");
      }
      if (!/[@$!%*?&#\-_.]/.test(formData.password)) {
        passwordValidationErrors.push("Al menos un carácter especial");
      }
      if (formData.password !== formData.confirmPassword) {
        passwordValidationErrors.push("Las contraseñas no coinciden");
      }

      // Age validation
      if (formData.birthDate) {
        const age = Math.floor((new Date() - new Date(formData.birthDate)) / 31557600000);
        if (age < 18) {
          errors.push("Debes ser mayor de 18 años");
        }
      }

      // Phone validation (optional)
      if (formData.phoneNumber) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
          errors.push("Número de teléfono inválido");
        }
      }

      if (!formData.acceptTerms) {
        errors.push("Debe aceptar los términos y condiciones");
      }

      if (passwordValidationErrors.length > 0) {
        errors.push(...passwordValidationErrors);
      }
    }

    return errors;
  };

  const handleNextStep = async () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    try {
      setError("");
      setLoading(true);

      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        // Signup process
        const userDataToSubmit = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber || null,
          birthDate: formData.birthDate || null,
          notification: formData.notification || false
        };

        await signup(userDataToSubmit);
        navigate("/verify-email");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    try {
      setError("");
      setLoading(true);
      
      await resendCode(formData.email);
      setError("Código de verificación reenviado");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Existing component structure remains the same */}
      {/* Make sure to update the button click handlers and add necessary changes */}
    </div>
  );
}

export default Signup;



