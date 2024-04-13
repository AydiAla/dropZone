import React, { useState } from "react";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FileUpload from "./FileUpload";
import './CustomAccordion.css'

const CustomAccordion = ({ title, moduleId }) => { // Assurez-vous de recevoir le moduleId
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? "active" : ""}`}>
      <div className={`accordion-header ${isOpen ? "active" : ""}`} onClick={toggleAccordion}>
        <p>{title}</p>
        <span className={`material-symbols-outlined ${isOpen ? "active" : ""}`}>
          <ArrowDropDownOutlinedIcon />
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <FileUpload courseId={moduleId} /> {/* Passer le moduleId comme courseId */}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
