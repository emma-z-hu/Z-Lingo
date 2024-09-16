import React from 'react';
import './SecondaryCTA.scss';

const SecondaryCTA = ({ label, onClick }) => {
  return (
    <button className="secondary-cta" onClick={onClick}>
      {label}
    </button>
  );
};

export default SecondaryCTA;
