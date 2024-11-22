//client/src/components/UI/FilterModal.jsx
import React, { useState } from "react";
import "../screens/css/FilterModal.css";

function FilterModal({ currentFilters, onApply, onClose, locations, skills }) {
  // Initialize tempFilters with currentFilters or default values
  const [tempFilters, setTempFilters] = useState({
    locations: currentFilters.locations || [],
    minAbility: currentFilters.minAbility || 0,
    skills: currentFilters.skills || [],
    availability: currentFilters.availability || "all"
  });

  const handleLocationToggle = (location) => {
    setTempFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(loc => loc !== location)
        : [...prev.locations, location]
    }));
  };

  const handleSkillToggle = (skill) => {
    setTempFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleApply = () => {
    onApply(tempFilters);
  };

  return (
    <div className="filter-overlay">
      <div className="filter-modal">
        <div className="filter-header">
          <h2>Filtros</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="filter-form">
          <div className="filter-group">
            <label>Calificación mínima</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={tempFilters.minAbility}
              onChange={(e) => setTempFilters(prev => ({
                ...prev,
                minAbility: parseFloat(e.target.value)
              }))}
              className="filter-input"
            />
            <span>{tempFilters.minAbility.toFixed(1)} ⭐</span>
          </div>

          <div className="filter-group">
            <label>Ubicación</label>
            <div className="filter-options">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationToggle(location)}
                  className={`filter-option ${tempFilters.locations.includes(location) ? 'selected' : ''}`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Habilidades</label>
            <div className="skills-filter-container">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`skill-filter-button ${tempFilters.skills.includes(skill) ? 'selected' : ''}`}
                  type="button"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Disponibilidad</label>
            <select
              value={tempFilters.availability}
              onChange={(e) => setTempFilters(prev => ({
                ...prev,
                availability: e.target.value
              }))}
              className="filter-select"
            >
              <option value="all">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="No disponible">No disponible</option>
            </select>
          </div>

          <div className="filter-actions">
            <button className="filter-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button className="filter-apply" onClick={handleApply}>
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;