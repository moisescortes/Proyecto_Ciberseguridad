import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OptionsPage.css';

function OptionsPage() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="options-container">
            <div className="options-content">
                <h1 className="options-title">¿Qué deseas hacer?</h1>
                <div className="options-grid">
                    <div 
                        className="option-card"
                        onClick={() => handleClick('/buscar-empleado')}
                    >
                        <div className="option-icon">🔍</div>
                        <h2>Buscar empleado</h2>
                        <p>Encuentra el talento perfecto para tu empresa</p>
                    </div>
                    
                    <div 
                        className="option-card"
                        onClick={() => handleClick('/hacer-perfil')}
                    >
                        <div className="option-icon">👤</div>
                        <h2>Hacer perfil</h2>
                        <p>Crea tu perfil y explora ofertas de trabajo</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OptionsPage;