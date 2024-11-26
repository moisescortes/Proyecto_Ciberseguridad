// SkillSelector.js
import React, { useState } from "react";
import SkillButton from "./SkillButton.js";
import { Search } from "lucide-react";

// Expanded list of available skills with categories
export const AVAILABLE_SKILLS = {
  "Lenguajes de Programación": [
    "JavaScript",
    "Python",
    "Java",
    "TypeScript",
    "C++",
    "PHP",
    "Ruby",
    "Swift",
    "Go",
  ],
  "Frontend": [
    "React",
    "Angular",
    "Vue.js",
    "HTML/CSS",
    "Redux",
    "Sass",
    "Webpack",
    "Next.js",
    "Tailwind CSS",
  ],
  "Backend": [
    "Node.js",
    "Express",
    "Django",
    "Spring",
    "Flask",
    "Laravel",
    "ASP.NET",
    "Ruby on Rails",
  ],
  "Bases de Datos": [
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Firebase",
    "GraphQL",
  ],
  "DevOps & Cloud": [
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "Azure",
    "Jenkins",
    "Terraform",
    "CI/CD",
  ],
  "Otros": [
    "Scrum",
    "Jira",
    "UI/UX",
    "Testing",
    "SEO",
    "Agile",
    "REST APIs",
  ],
};

const SkillSelector = ({ selectedSkills, onSkillToggle, mode = "select" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filterSkills = (skills) => {
    return Object.entries(skills).reduce((acc, [category, skillList]) => {
      const filteredSkills = skillList.filter((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredSkills.length > 0) {
        acc[category] = filteredSkills;
      }
      return acc;
    }, {});
  };

  const filteredSkills = searchTerm
    ? filterSkills(AVAILABLE_SKILLS)
    : AVAILABLE_SKILLS;

  const categories = ["Todos", ...Object.keys(AVAILABLE_SKILLS)];

  const renderSkills = () => {
    if (activeCategory === "Todos") {
      return Object.entries(filteredSkills).map(([category, skills]) => (
        <div key={category} className="skill-category">
          <h3 className="category-title">{category}</h3>
          <div className="skill-buttons">
            {skills.map((skill) => (
              <SkillButton
                key={skill}
                skill={skill}
                isSelected={selectedSkills.includes(skill)}
                onClick={() => onSkillToggle(skill)}
                mode={mode}
              />
            ))}
          </div>
        </div>
      ));
    } else {
      const categorySkills = filteredSkills[activeCategory] || [];
      return (
        <div className="skill-category">
          <div className="skill-buttons">
            {categorySkills.map((skill) => (
              <SkillButton
                key={skill}
                skill={skill}
                isSelected={selectedSkills.includes(skill)}
                onClick={() => onSkillToggle(skill)}
                mode={mode}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="skill-selector">
      <div className="skill-selector-header">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Buscar habilidades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="selected-count">
          {selectedSkills.length} habilidade(s) seleccionada(s)
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {searchTerm && Object.keys(filteredSkills).length === 0 ? (
          <div className="no-results">
            No se encontraron habilidades que coincidan con "{searchTerm}"
          </div>
        ) : (
          renderSkills()
        )}
      </div>
    </div>
  );
};

export default SkillSelector;