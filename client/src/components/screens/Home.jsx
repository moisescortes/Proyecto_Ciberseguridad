//client/src/components/screens/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Briefcase, TrendingUp, Users } from "lucide-react";
import "./css/Home.css";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const features = [
    {
      icon: <Search size={24} />,
      title: "Búsqueda Inteligente",
      description: "Encuentra el trabajo perfecto con nuestra búsqueda avanzada"
    },
    {
      icon: <Briefcase size={24} />,
      title: "Miles de Empleos",
      description: "Accede a una amplia base de ofertas laborales actualizadas"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Desarrollo Profesional",
      description: "Impulsa tu carrera con oportunidades de crecimiento"
    },
    {
      icon: <Users size={24} />,
      title: "Networking",
      description: "Conecta con empresas y profesionales de tu sector"
    }
  ];

  return (
    <motion.div
      className="home-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="home-content">
        <motion.div className="hero-section" variants={itemVariants}>
          <motion.h1 className="home-title">
            Buscador de Empleos
          </motion.h1>
          
          <motion.p className="home-subtitle">
            Encuentra el trabajo de tus sueños y construye tu futuro profesional
          </motion.p>

          <motion.nav className="home-nav">
            <Link 
              to="/login" 
              className="home-button login-button"
              aria-label="Iniciar sesión"
            >
              <span className="button-text">Ingresar</span>
              <span className="button-icon">→</span>
            </Link>
            
            <Link 
              to="/signup" 
              className="home-button signup-button"
              aria-label="Crear nueva cuenta"
            >
              <span className="button-text">Crear Cuenta</span>
              <span className="button-icon">+</span>
            </Link>
          </motion.nav>
        </motion.div>

        <motion.div 
          className="features-section"
          variants={itemVariants}
        >
          <h2 className="features-title">¿Por qué elegirnos?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="stats-section"
          variants={itemVariants}
        >
          <div className="stat-item">
            <h4 className="stat-number">10k+</h4>
            <p className="stat-label">Empleos Activos</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-number">5k+</h4>
            <p className="stat-label">Empresas</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-number">50k+</h4>
            <p className="stat-label">Usuarios</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;