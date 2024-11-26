//client/src/components/screens/ProfileOptionsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ProfileOptionsPage.css';

function ProfileOptionsPage() {
    const navigate = useNavigate();
    const [hoveredOption, setHoveredOption] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleNavigation = (path) => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate(path);
        }, 300);
    };

    const options = [
        {
            title: 'Hacer/Editar Perfil',
            description: 'Personaliza tu perfil y mantén tu información actualizada',
            path: '/make-edit-profile',
            icon: '👤',
            features: [
                'Editor de perfil intuitivo',
                'Carga de foto de perfil',
                'Gestión de habilidades',
                'Experiencia laboral'
            ]
        },
        {
            title: 'Ver ofertas',
            description: 'Explora las ofertas disponibles para ti',
            path: '/look-at-offers',
            icon: '🎯',
            features: [
                'Ofertas personalizadas',
                'Filtros avanzados',
                'Notificaciones en tiempo real',
                'Aplicación con un clic'
            ]
        }
    ];

    return (
        <div className="profile-options-container">
            <div className="animated-background">
                <div className="gradient-sphere"></div>
                <div className="gradient-sphere"></div>
                <div className="gradient-sphere"></div>
            </div>

            <div className={`profile-content ${isTransitioning ? 'fade-out' : ''}`}>
                <button 
                    className="back-button"
                    onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                            navigate('/options');
                        }, 300);
                    }}
                >
                    <span className="back-icon">←</span>
                    <span>Atrás</span>
                </button>

                <h1 className="profile-title">
                    <span className="title-highlight">Opciones</span> de Perfil
                </h1>

                <div className="options-grid">
                    {options.map((option, index) => (
                        <div
                            key={option.path}
                            className={`option-card ${hoveredOption === index ? 'hovered' : ''}`}
                            onClick={() => handleNavigation(option.path)}
                            onMouseEnter={() => setHoveredOption(index)}
                            onMouseLeave={() => setHoveredOption(null)}
                        >
                            <div className="card-spotlight"></div>
                            <div className="option-icon">{option.icon}</div>
                            <div className="option-content">
                                <h2 className="option-title">{option.title}</h2>
                                <p className="option-description">{option.description}</p>
                                <div className="features-list">
                                    {option.features.map((feature, i) => (
                                        <div key={i} className="feature-item">
                                            <span className="feature-check">✓</span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hover-indicator">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileOptionsPage;