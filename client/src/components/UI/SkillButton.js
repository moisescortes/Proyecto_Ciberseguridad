//client/src/components/UI/SkillButton.js
import React from "react";
import { Check } from "lucide-react";

const SkillButton = ({ skill, isSelected, onClick, mode = "select" }) => {
  if (mode === "display") {
    return (
      <span className={`skill-button ${isSelected ? "selected" : ""}`}>
        {skill}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`skill-button ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {skill}
      {isSelected && <Check size={16} />}
    </button>
  );
};

export default SkillButton;