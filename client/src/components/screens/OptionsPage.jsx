//client/src/components/screens/OptionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/OptionsPage.css';
import { useAuth } from "../../contexts/AuthContext.js";

function OptionsPage() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = (path) => {
        setActiveCard(path);
        setTimeout(() => {
            navigate(path);
        }, 300);
    };

    return (
        <div className="options-container">
            <div className="options-background">
                <div className="background-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>

            {showWelcome && (
                <div className="welcome-message">
                    <span className="welcome-icon">👋</span>
                    <h2>¡Bienvenido{user?.name ? `, ${user.name}` : ''}!</h2>
                </div>
            )}

            <div className="options-content">
                <h1 className="options-title">¿Qué deseas hacer?</h1>
                <p className="options-subtitle">Selecciona una opción para comenzar tu viaje</p>

                <div className="options-grid">
                    <div 
                        className={`option-card ${activeCard === '/buscar-empleado' ? 'active' : ''}`}
                        onClick={() => handleClick('/buscar-empleado')}
                    >
                        <div className="card-spotlight"></div>
                        <div className="option-icon">🔍</div>
                        <div className="card-content">
                            <div className="card-badge">Popular</div>
                            <h2>Buscar empleado</h2>
                            <p>Encuentra el talento perfecto para tu empresa</p>
                            <div className="card-features">
                                <span><i className="feature-icon">✓</i>Búsqueda avanzada con IA</span>
                                <span><i className="feature-icon">✓</i>Filtros inteligentes</span>
                                <span><i className="feature-icon">✓</i>Perfiles verificados</span>
                                <span><i className="feature-icon">✓</i>Matching automático</span>
                            </div>
                        </div>
                        <div className="card-arrow">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>

                    <div 
                        className={`option-card ${activeCard === '/hacer-perfil' ? 'active' : ''}`}
                        onClick={() => handleClick('/hacer-perfil')}
                    >
                        <div className="card-spotlight"></div>
                        <div className="option-icon">👤</div>
                        <div className="card-content">
                            <div className="card-badge new">Nuevo</div>
                            <h2>Hacer perfil</h2>
                            <p>Crea tu perfil profesional y destaca en el mercado</p>
                            <div className="card-features">
                                <span><i className="feature-icon">✓</i>Perfil profesional avanzado</span>
                                <span><i className="feature-icon">✓</i>Portfolio interactivo</span>
                                <span><i className="feature-icon">✓</i>Visibilidad empresarial</span>
                                <span><i className="feature-icon">✓</i>Análisis de competencias</span>
                            </div>
                        </div>
                        <div className="card-arrow">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="button-content">
                            <span className="loading-spinner"></span>
                            <span>Cerrando sesión...</span>
                        </div>
                    ) : (
                        <div className="button-content">
                            <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m-5 5h10"/>
                            </svg>
                            <span>Cerrar Sesión</span>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}

export default OptionsPage;