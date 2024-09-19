import React from 'react';
import './Header.scss';

const Header = ({ difficulty }) => {
  return (
    <div className="header">
      <h1 className="header__title">Level: {difficulty}</h1>
      {/* <img src={`../../assets/icons/${difficulty.toLowerCase()}-icon.png`} alt={`${difficulty} icon`} className="header__icon" /> */}
    </div>
  );
};

export default Header;
