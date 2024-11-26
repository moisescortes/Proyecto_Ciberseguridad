//client/src/components/screens/EmployeeListPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "../UI/FilterModal.jsx";
import { Search, MapPin, Star, Mail, Phone, ArrowLeft, Filter, Download } from "lucide-react";
import "./css/EmployeeListPage.css";

const employeeComments = {
  1: [ // ID de Juan Cortez
    {
      id: 1,
      name: "Ana Lopez",
      rating: 4.5,
      comment: "Juan es un desarrollador excepcional con un dominio increíble de JavaScript y React. Siempre cumple con los plazos y su código es muy limpio y bien estructurado.",
      date: "2023-11-15"
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      rating: 4.2,
      comment: "Excelente colaborador en proyectos de Node.js. Su capacidad para resolver problemas complejos es realmente impresionante.",
      date: "2023-10-22"
    }
  ],
  2: [ // ID de Maria Sanchez
    {
      id: 1,
      name: "Pedro Martinez",
      rating: 4.7,
      comment: "Maria es una desarrolladora de Python extremadamente competente. Su conocimiento de Django y SQL es profundo y siempre aporta soluciones innovadoras.",
      date: "2023-11-10"
    }
  ],
  3: [ // ID de Carlos Ramirez
    {
      id: 1,
      name: "Laura Garcia",
      rating: 4.0,
      comment: "Carlos tiene un conocimiento sólido de Java y Docker. Es muy meticuloso en la implementación de sistemas y arquitecturas de microservicios.",
      date: "2023-09-15"
    }
  ]
};

const employees = [
  {
    id: 1,
    name: "Juan Cortez",
    location: "Guadalajara",
    ability: 4.5,
    skills: ["JavaScript", "React", "Node.js"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4QLQvRTvyNYobrxnBXa6TW26NOjdwnt4NKw&s",
    email: "juan.cortez@example.com",
    phone: "+52 123 456 7890",
    availability: "Disponible",
    experience: "5 años",
    languages: ["Español", "Inglés"],
    projects: 15
  },
  {
    id: 2,
    name: "Maria Sanchez",
    location: "Mexico City",
    ability: 4.8,
    skills: ["Python", "Django", "SQL"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sDUuui8I-qJjlzt3CXaHBvbvEMVDvXcreQ&s",
    email: "maria.sanchez@example.com",
    phone: "+52 987 654 3210",
    availability: "Disponible",
    experience: "4 años",
    languages: ["Español", "Inglés"],
    projects: 10
  },
  {
    id: 3,
    name: "Carlos Ramirez",
    location: "Monterrey",
    ability: 4.2,
    skills: ["Java", "Spring", "Docker"],
    image: "https://pbs.twimg.com/profile_images/1083191953272029185/xWHr1wYu_400x400.jpg",
    email: "carlos.ramirez@example.com",
    phone: "+52 555 123 4567",
    availability: "No disponible",
    experience: "6 años",
    languages: ["Español"],
    projects: 8
  },
];
function EmployeeListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    minAbility: 0,
    locations: [],
    skills: [],
    availability: "all"
  });
  const [view, setView] = useState("grid"); // grid or list
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      minAbility: 0,
      locations: [],
      skills: [],
      availability: "all"
    });
  };

  const exportToCSV = () => {
    const csvContent = filteredEmployees
      .map(emp => `${emp.name},${emp.location},${emp.ability},${emp.skills.join(';')}`)
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
  };

  const handleContactClick = (employee) => {
    setSelectedEmployee(employee); // Establece el empleado seleccionado
  };

  const filteredEmployees = employees
    .filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilters = emp.ability >= filters.minAbility &&
        (filters.locations.length === 0 || filters.locations.includes(emp.location)) &&
        (filters.skills.length === 0 || emp.skills.some(skill => filters.skills.includes(skill))) &&
        (filters.availability === "all" || emp.availability === filters.availability);
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "ability") return b.ability - a.ability;
      if (sortOption === "experience") return parseInt(b.experience) - parseInt(a.experience);
      return 0;
    });

  const renderComments = (employeeId) => {
    const comments = employeeComments[employeeId] || [];
    
    return (
      <div className="comments-section">
        <h3>Comentarios y Reseñas</h3>
        {comments.length === 0 ? (
          <p className="no-comments">No hay comentarios disponibles</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <div className="comment-author">{comment.name}</div>
                <div className="comment-rating">
                  <Star size={16} fill="#FFD700" />
                  <span>{comment.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="comment-body">
                <p>{comment.comment}</p>
              </div>
              <div className="comment-footer">
                <span className="comment-date">
                  {new Date(comment.date).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderEmployeeCard = (employee) => (
    <div key={employee.id} className="employee-card">
      <div className="employee-header">
        <div className="employee-header-top">
          <div className="employee-image-container">
            <img src={employee.image} alt={employee.name} className="employee-image" />
            <div className="online-indicator"></div>
          </div>
          <span className={`status-badge ${employee.availability.toLowerCase()}`}>
            {employee.availability}
          </span>
        </div>
        <div className="employee-rating-banner">
          <Star size={16} fill="#FFD700" className="star-icon" />
          <div className="rating-bar">
            <div 
              className="rating-fill" 
              style={{ width: `${(employee.ability / 5) * 100}%` }}
            ></div>
          </div>
          <span className="rating-number">{employee.ability}</span>
        </div>
      </div>

      <div className="employee-info">
        <div className="name-location">
          <h3>{employee.name}</h3>
          <div className="location-badge">
            <MapPin size={14} />
            <span>{employee.location}</span>
          </div>
        </div>

        <div className="employee-metrics">
          <div className="metric">
            <div className="metric-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <div className="metric-info">
              <span className="metric-value">{employee.experience}</span>
              <span className="metric-label">Experiencia</span>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric">
            <div className="metric-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="metric-info">
              <span className="metric-value">{employee.projects}</span>
              <span className="metric-label">Proyectos</span>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h4>Habilidades Principales</h4>
          <div className="skills-container">
            {employee.skills.map((skill, index) => (
              <span key={skill} className={`skill-tag priority-${index + 1}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="languages-section">
          <h4>Idiomas</h4>
          <div className="languages-container">
            {employee.languages.map((lang) => (
              <div key={lang} className="language-badge">
                <span className="language-dot"></span>
                {lang}
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <button 
            className="contact-button primary"
            onClick={() => handleContactClick(employee)}
          >
            <Mail size={16} />
            Contactar
          </button>
          <button 
            className="contact-button secondary"
            onClick={() => window.open(`tel:${employee.phone}`)}
          >
            <Phone size={16} />
            Llamar
          </button>
        </div>
      </div>

      <div className="card-footer">
        <div className="availability-indicator">
          <span className="availability-dot"></span>
          Última actividad: Hace 2 horas
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando empleados...</p>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <nav className="top-nav">
        <button className="back-button" onClick={() => navigate("/options")}>
          <ArrowLeft size={20} /> Atrás 
        </button>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '160px' }}>
          <h1>Lista de Empleados</h1>
        </div>
        <div className="view-options">
          <button 
            className={`view-button ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
          >
            Grid
          </button>
          <button 
            className={`view-button ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            Lista
          </button>
        </div>
      </nav>

      <div className="controls">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o habilidad..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="sort-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Ordenar por...</option>
          <option value="name">Nombre</option>
          <option value="ability">Calificación</option>
          <option value="experience">Experiencia</option>
        </select>
        <button 
          className="filter-button"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Filter size={20} />
          Filtros
        </button>
        <button 
          className="clear-filters-button" // Añadir clase para estilos
          onClick={clearFilters}
        >
          Limpiar Filtros
        </button>
        <button 
          className="export-button"
          onClick={exportToCSV}
        >
          <Download size={20} />
          Exportar
        </button>
      </div>

      <div className={`employee-list ${view}`}>
        {filteredEmployees.length === 0 ? (
          <div className="no-results">
            <div className="no-results-content">
              <img 
                src="/empty-state.svg" 
                alt="No hay resultados" 
                className="no-results-image"
              />
              <h3>No se encontraron resultados</h3>
              <p>Intenta ajustar los filtros o realizar una nueva búsqueda</p>
            </div>
          </div>
        ) : (
          filteredEmployees.map(renderEmployeeCard)
        )}
      </div>

      {selectedEmployee && (
        <div 
          className="contact-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEmployee(null);
          }}
        >
          <div className="contact-modal">
            <button className="close-modal" onClick={() => setSelectedEmployee(null)}>
              &times;
            </button>
            <div className="modal-header">
              <img src={selectedEmployee.image} alt={selectedEmployee.name} className="contact-image" />
              <h2>{selectedEmployee.name}</h2>
              <span className={`status-badge ${selectedEmployee.availability.toLowerCase()}`}>
                {selectedEmployee.availability}
              </span>
            </div>
            <div className="modal-content">
              <div className="contact-info">
                <p><MapPin size={16} /> {selectedEmployee.location}</p>
                <p><Star size={16} /> {selectedEmployee.ability}</p>
                <p><Mail size={16} /> {selectedEmployee.email}</p>
                <p><Phone size={16} /> {selectedEmployee.phone}</p>
              </div>
              <div className="additional-info">
                <h3>Experiencia y Habilidades</h3>
                <p>Experiencia: {selectedEmployee.experience}</p>
                <p>Proyectos Completados: {selectedEmployee.projects}</p>
                <div className="skills-container">
                  {selectedEmployee.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="languages">
                  <h4>Idiomas:</h4>
                  {selectedEmployee.languages.map((lang) => (
                    <span key={lang} className="language-tag">{lang}</span>
                  ))}
                </div>
              </div>
              <div className="map-container">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    selectedEmployee.location
                  )}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="map"
                ></iframe>
              </div>
              {/* Añadir sección de comentarios después del mapa */}
              <div className="comments-container">
                {renderComments(selectedEmployee.id)}
              </div>
            </div>
          </div>
        </div>
      )}

      {isFilterModalOpen && (
        <FilterModal
          currentFilters={filters}
          onApply={handleFilterChange}
          onClose={() => setIsFilterModalOpen(false)}
          locations={[...new Set(employees.map(emp => emp.location))]}
          skills={[...new Set(employees.flatMap(emp => emp.skills))]}
        />
      )}
    </div>
  );
}

export default EmployeeListPage;