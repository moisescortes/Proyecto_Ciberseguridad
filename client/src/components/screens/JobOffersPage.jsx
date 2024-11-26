import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/JobOffersPage.css';
import { Search, MapPin, Clock, Phone, Mail, Briefcase, ChevronLeft, Filter, Heart, Share2, BookmarkPlus } from 'lucide-react';

function JobOffersPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [favorites, setFavorites] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

  // Sample job offers data with enhanced information
  const jobOffers = [
    {
        id: 1,
        title: 'Desarrollador Web Frontend',
        company: 'TechCorp Solutions',
        description: 'Buscamos un desarrollador web frontend con experiencia en React y conocimientos de UI/UX. El candidato ideal debe tener capacidad para trabajar en equipo y pasión por crear interfaces de usuario excepcionales.',
        requirements: [
            'Experiencia de 3+ años con React',
            'Conocimientos avanzados de JavaScript/TypeScript',
            'Experiencia con sistemas de diseño',
            'Dominio de HTML5 y CSS3'
        ],
        benefits: [
            'Seguro médico privado',
            'Horario flexible',
            'Formación continua',
            '23 días de vacaciones'
        ],
        salary: '35.000€ - 45.000€',
        location: 'Madrid, España (Híbrido)',
        hours: '40 horas semanales, Lunes a Viernes',
        phone: '+34 123 456 789',
        email: 'rrhh@empresa1.es',
        postedDate: '2024-03-20',
        type: 'Tiempo completo'
    },
    {
        id: 2,
        title: 'Diseñador UX/UI Senior',
        company: 'Digital Innovations',
        description: 'Empresa líder en tecnología busca diseñador UX/UI senior para liderar proyectos de diseño de productos digitales. Se requiere experiencia en Figma y capacidad para mentorizar a diseñadores junior.',
        requirements: [
            'Experiencia de 5+ años en diseño UX/UI',
            'Portfolio demostrable',
            'Experiencia liderando equipos',
            'Dominio de Figma y Adobe Creative Suite'
        ],
        benefits: [
            'Trabajo 100% remoto',
            'Plan de pensiones',
            'Presupuesto para equipo',
            'Bonus anual'
        ],
        salary: '40.000€ - 55.000€',
        location: 'Barcelona, España (Remoto)',
        hours: '35 horas semanales, Horario flexible',
        phone: '+34 987 654 321',
        email: 'careers@empresa2.com',
        postedDate: '2024-03-18',
        type: 'Tiempo completo'
    },
    {
        id: 3,
        title: 'Desarrollador Backend Java',
        company: 'Innovate Systems',
        description: 'Se busca desarrollador backend con experiencia en Java y Spring Boot. Importante conocimiento en bases de datos SQL y NoSQL. Valorable experiencia en arquitecturas microservicios.',
        requirements: [
            'Experiencia de 4+ años con Java',
            'Conocimientos de Spring Boot',
            'Experiencia con bases de datos SQL y NoSQL',
            'Conocimientos de Docker'
        ],
        benefits: [
            'Gimnasio en oficina',
            'Ticket restaurante',
            'Seguro dental',
            'Formación internacional'
        ],
        salary: '38.000€ - 48.000€',
        location: 'Valencia, España (Presencial)',
        hours: '40 horas semanales, 9:00-18:00',
        phone: '+34 555 123 456',
        email: 'jobs@empresa3.es',
        postedDate: '2024-03-15',
        type: 'Tiempo completo'
    }
];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleLocationFilter = (e) => {
        setSelectedLocation(e.target.value);
    };

    const toggleFavorite = (jobId) => {
        setFavorites(prev => 
            prev.includes(jobId) 
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    const shareJob = (job) => {
        if (navigator.share) {
            navigator.share({
                title: job.title,
                text: `Oferta de trabajo: ${job.title} en ${job.company}`,
                url: window.location.href,
            })
            .then(() => {
                setNotification({ message: 'Compartido con éxito', type: 'success' });
            })
            .catch((error) => {
                console.error('Error al compartir:', error);
                setNotification({ message: 'Compartir fue cancelado o falló.', type: 'error' });
            });
        } else {
            setNotification({ message: 'La función de compartir no está disponible en este navegador.', type: 'error' });
        }
    };

    const filteredJobs = jobOffers.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                            job.description.toLowerCase().includes(searchTerm) ||
                            job.company.toLowerCase().includes(searchTerm);
        const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation);
        return matchesSearch && matchesLocation;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        }).format(date);
    };

    return (
        <div className="offers-container">
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            <div className="offers-content">
                <button 
                    className="back-button"
                    onClick={() => navigate('/hacer-perfil')}
                >
                    <ChevronLeft size={20} /> Atrás
                </button>

                <h2 className="offers-title">Ofertas de Trabajo</h2>

                <div className="filters-section">
                    <div className="search-container">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por título, empresa o descripción..."
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>

                    <div className="location-filter">
                        <Filter className="filter-icon" />
                        <select 
                            onChange={handleLocationFilter}
                            className="location-select"
                        >
                            <option value="all">Todas las ubicaciones</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Valencia">Valencia</option>
                        </select>
                    </div>
                </div>

                <div className="jobs-count">
                    {filteredJobs.length} ofertas encontradas
                </div>

                {filteredJobs.map((job) => (
                    <div key={job.id} className="job-card">
                        <div className="job-card-header">
                            <div className="job-main-info">
                                <h3 className="job-title">{job.title}</h3>
                                <div className="company-name">{job.company}</div>
                            </div>
                            <div className="job-actions">
                                <button 
                                    className={`action-button favorite-button ${favorites.includes(job.id) ? 'favorited' : ''}`}
                                    onClick={() => toggleFavorite(job.id)}
                                >
                                    <Heart className={favorites.includes(job.id) ? 'filled' : ''} size={20} />
                                </button>
                                <button 
                                    className="action-button"
                                    onClick={() => shareJob(job)}
                                >
                                    <Share2 size={20} />
                                </button>
                                <button className="action-button">
                                    <BookmarkPlus size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="job-meta-info">
                            <div className="meta-item">
                                <MapPin size={18} />
                                {job.location}
                            </div>
                            <div className="meta-item">
                                <Clock size={18} />
                                {job.hours}
                            </div>
                            <div className="meta-item">
                                <Briefcase size={18} />
                                {job.type}
                            </div>
                        </div>

                        <p className="job-description">{job.description}</p>

                        <div className="job-details">
                            <div className="details-section">
                                <h4>Requisitos</h4>
                                <ul>
                                    {job.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="details-section">
                                <h4>Beneficios</h4>
                                <ul>
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="salary-section">
                            <h4>Rango Salarial</h4>
                            <p>{job.salary}</p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-item">
                                <Phone size={20} />
                                {job.phone}
                            </div>
                            <div className="contact-item">
                                <Mail size={20} />
                                {job.email}
                            </div>
                        </div>

                        <div className="job-footer">
                            <span className="posted-date">
                                Publicado el {formatDate(job.postedDate)}
                            </span>
                            <button className="apply-button">
                                Aplicar ahora
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobOffersPage;