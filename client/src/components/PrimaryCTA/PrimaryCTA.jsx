import React from 'react';
import './PrimaryCTA.scss';

const PrimaryCTA = ({ label, onClick }) => {
  return (
    <button className="primary-cta" onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryCTA;
