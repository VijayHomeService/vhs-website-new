// src/DiwaliPopup.js
import React, { useState } from 'react';
import './DiwaliPopup.css';
import diwaliImage from '../assests/diwali-holiday.jpeg';

const DiwaliPopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <img src={diwaliImage} alt="Diwali Celebration" className="popup-image" />
        <span className="close-icon" onClick={handleClosePopup}>&times;</span> {/* Close icon */}
      </div>
    </div>
  );
};

export default DiwaliPopup;
