import React from 'react';
import './DifficultyCard.scss';

const DifficultyCard = ({ icon, label, onClick, selected }) => {
  return (
    <div
      className={`difficulty-card ${selected ? 'difficulty-card--selected' : ''}`}
      onClick={onClick}
    >
      <img src={icon} alt={`${label} icon`} className="difficulty-card__icon" />
      <p className="difficulty-card__label">{label}</p>
    </div>
  );
};

export default DifficultyCard;
