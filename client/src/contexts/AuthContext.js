//client/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../firebase.js"; // Agregar la extensión .js
import { doc, setDoc, getDoc } from "firebase/firestore"; // Métodos de Firestore

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  // Registro de usuario y guardado de datos en Firestore
  async function signup(userData) {
    try {
      // Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const user = userCredential.user;

      // Enviar email de verificación
      await sendEmailVerification(user);

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        birthDate: userData.birthDate || null,
        phoneNumber: userData.phoneNumber || null,
        notification: userData.notification || false,
        createdAt: new Date().toISOString(),
      });

      return user;
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  }

  // Inicio de sesión
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Obtener datos adicionales desde Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      // Combinar datos de Authentication y Firestore
      setCurrentUser({ ...userCredential.user, ...userData });
      return userCredential.user;
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  }

  // Cerrar sesión
  function logout() {
    return signOut(auth);
  }

  // Resend verification email
  async function resendCode(email) {
    try {
      const user = auth.currentUser;
      if (!user || user.email !== email) {
        throw new Error("Usuario no autenticado o correo incorrecto");
      }
      await sendEmailVerification(user);
    } catch (error) {
      throw new Error("Error al reenviar el código de verificación");
    }
  }

  // Mantener al usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
        setCurrentUser({ ...user, ...userData });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  // Función para traducir errores
  function getErrorMessage(errorCode) {
    const messages = {
      "auth/email-already-in-use": "Este correo electrónico ya está registrado",
      "auth/invalid-email": "Correo electrónico inválido",
      "auth/operation-not-allowed": "Operación no permitida",
      "auth/weak-password": "La contraseña es demasiado débil",
      "auth/user-disabled": "Esta cuenta ha sido deshabilitada",
      "auth/user-not-found": "No existe una cuenta con este correo electrónico",
      "auth/wrong-password": "Contraseña incorrecta",
    };

    return messages[errorCode] || "Ocurrió un error durante la autenticación";
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resendCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
