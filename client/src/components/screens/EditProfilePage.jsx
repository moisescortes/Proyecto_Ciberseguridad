// client/src/components/screens/EditProfilePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillSelector from "../UI/SkillSelector.js";
import { AlertCircle, Check, X } from "lucide-react";
import "./css/EditProfilePage.css";

function EditProfilePage() {
  const navigate = useNavigate();
  const [isEmployer, setIsEmployer] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [imagePreview, setImagePreview] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    companyName: "",
    image: null,
    location: "",
    skills: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSkillToggle = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        image: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showNotificationMessage = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!profile.lastName || (isEmployer && !profile.companyName)) {
      showNotificationMessage("Por favor complete todos los campos requeridos", "error");
      return;
    }

    // Simulating API call
    setTimeout(() => {
      showNotificationMessage(
        isEmployer
          ? "Perfil de empresa actualizado exitosamente"
          : "Perfil de candidato actualizado exitosamente"
      );
    }, 1000);

    console.log({ isEmployer, profile });
  };

  const toggleProfileType = () => {
    setIsEmployer(!isEmployer);
    setProfile({
      name: "",
      lastName: "",
      companyName: "",
      image: null,
      location: "",
      skills: [],
    });
    setImagePreview(null);
  };

  return (
    <div className="edit-profile-container">
      {showNotification && (
        <div className={`notification ${notificationType}`}>
          <span className="notification-icon">
            {notificationType === "success" ? (
              <Check size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
          </span>
          {notificationMessage}
          <button
            className="notification-close"
            onClick={() => setShowNotification(false)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <button className="back-button" onClick={() => navigate("/hacer-perfil")}>
        <span className="back-arrow">←</span> Atrás
      </button>

      <div className="content-wrapper">
        <h2>Editar perfil</h2>

        <div className="profile-type-toggle">
          <button
            type="button"
            className={`toggle-button ${!isEmployer ? "active" : ""}`}
            onClick={toggleProfileType}
          >
            Buscador de empleo
          </button>
          <button
            type="button"
            className={`toggle-button ${isEmployer ? "active" : ""}`}
            onClick={toggleProfileType}
          >
            Empleador
          </button>
        </div>

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-section">
              {/* Se eliminó el campo de "Nombre" para empleadores */}
              {!isEmployer && (
                <label className="input-label">
                  Nombre: <span className="required">*</span>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </label>
              )}

              {!isEmployer && (
                <label className="input-label">
                  Apellido: <span className="required">*</span>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </label>
              )}

              {isEmployer && (
                <label className="input-label">
                  Nombre de la empresa: <span className="required">*</span>
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </label>
              )}

              <label className="input-label">
                Locación:
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ciudad, País"
                />
              </label>
            </div>

            <div className="form-section">
              <label className="input-label image-upload-label">
                Imagen de perfil:
                <div className="image-upload-container">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => {
                          setImagePreview(null);
                          setProfile({ ...profile, image: null });
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                      />
                      <div className="upload-icon">📷</div>
                      <span>Haga clic para subir</span>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {!isEmployer && (
            <div className="skills-section">
              <label className="input-label">
                Habilidades:
                <div className="skills-container">
                  <SkillSelector
                    selectedSkills={profile.skills}
                    onSkillToggle={handleSkillToggle}
                  />
                </div>
              </label>
            </div>
          )}

          <button type="submit" className="submit-button">
            Guardar perfil
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;