import React from 'react';
import './Header.scss';

const Header = ({ level }) => {
  return (
    <div className="header">
      <h1 className="header__title">Level: {level}</h1>
      <img src={`/assets/icons/${level.toLowerCase()}-icon.png`} alt={`${level} icon`} className="header__icon" />
    </div>
  );
};

export default Header;
