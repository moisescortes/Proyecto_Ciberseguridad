//client/src/components/screens/OptionsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/OptionsPage.css';
import { useAuth } from "../../contexts/AuthContext.js";

function OptionsPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

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
            <div className="options-background"></div>
            <div className="options-content">
                <h1 className="options-title">¿Qué deseas hacer?</h1>
                <p className="options-subtitle">Selecciona una opción para comenzar</p>
                
                <div className="options-grid">
                    <div 
                        className={`option-card ${activeCard === '/buscar-empleado' ? 'active' : ''}`}
                        onClick={() => handleClick('/buscar-empleado')}
                    >
                        <div className="option-icon">🔍</div>
                        <div className="card-content">
                            <h2>Buscar empleado</h2>
                            <p>Encuentra el talento perfecto para tu empresa</p>
                            <div className="card-features">
                                <span>✓ Búsqueda avanzada</span>
                                <span>✓ Filtros inteligentes</span>
                                <span>✓ Perfiles verificados</span>
                            </div>
                        </div>
                        <div className="card-arrow">→</div>
                    </div>

                    <div 
                        className={`option-card ${activeCard === '/hacer-perfil' ? 'active' : ''}`}
                        onClick={() => handleClick('/hacer-perfil')}
                    >
                        <div className="option-icon">👤</div>
                        <div className="card-content">
                            <h2>Hacer perfil</h2>
                            <p>Crea tu perfil y explora ofertas de trabajo</p>
                            <div className="card-features">
                                <span>✓ Perfil profesional</span>
                                <span>✓ Destacar habilidades</span>
                                <span>✓ Visibilidad empresarial</span>
                            </div>
                        </div>
                        <div className="card-arrow">→</div>
                    </div>
                </div>

                <button 
                    className={`logout-button ${isLoading ? 'loading' : ''}`} 
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        'Cerrar Sesión'
                    )}
                </button>
            </div>
        </div>
    );
}

export default OptionsPage;