//client/src/components/screens/EmployeeListPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "../UI/FilterModal.jsx";
import "./css/EmployeeListPage.css";

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
	},
];

function EmployeeListPage() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState("");
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const handleContactClick = (employee) => {
		setSelectedEmployee(employee);
	};

	const filteredEmployees = employees
		.filter(
			(emp) =>
				emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				emp.skills.some((skill) =>
					skill.toLowerCase().includes(searchQuery.toLowerCase())
				)
		)
		.sort((a, b) => {
			if (sortOption === "name") return a.name.localeCompare(b.name);
			if (sortOption === "ability") return b.ability - a.ability;
			return 0;
		});

	return (
		<div className="employee-list-container">
			<button className="back-button" onClick={() => navigate("/options")}>
				Atrás
			</button>
			<div className="controls">
				<input
					type="text"
					placeholder="Buscar por nombre o habilidad..."
					className="search-bar"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<select
					className="sort-dropdown"
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
				>
					<option value="">Ordenar por...</option>
					<option value="name">Nombre</option>
					<option value="ability">Calificación</option>
				</select>
			</div>
			<div className="employee-list">
				{filteredEmployees.map((employee) => (
					<div key={employee.id} className="employee-card">
						<img src={employee.image} alt={employee.name} className="employee-image" />
						<div className="employee-info">
							<h3>{employee.name}</h3>
							<p>
								<span>📍</span> {employee.location}
							</p>
							<div className="employee-rating">
								<span>⭐</span> {employee.ability}
							</div>
							<div className="skills-container">
								{employee.skills.map((skill) => (
									<span key={skill} className="skill-tag">
										{skill}
									</span>
								))}
							</div>
							<button className="contact-button" onClick={() => handleContactClick(employee)}>
								Contactar
							</button>
						</div>
					</div>
				))}
			</div>
			{/* Modal de contacto */}
			{selectedEmployee && (
				<div className="contact-modal-overlay" onClick={() => setSelectedEmployee(null)}>
					<div className="contact-modal">
						<button className="close-modal" onClick={() => setSelectedEmployee(null)}>
							&times;
						</button>
						<img src={selectedEmployee.image} alt={selectedEmployee.name} className="contact-image" />
						<h2>{selectedEmployee.name}</h2>
						<p>📍 {selectedEmployee.location}</p>
						<p>⭐ {selectedEmployee.ability}</p>
						<p>📧 {selectedEmployee.email}</p>
						<p>📞 {selectedEmployee.phone}</p>
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
				</div>
			)}
		</div>
	);
}

export default EmployeeListPage;
