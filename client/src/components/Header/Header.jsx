import React from 'react';
import './Header.scss';

const Header = ({ difficulty }) => {
  return (
    <div className="header">
      <h1 className="header__title">Level: {difficulty}</h1>
    </div>
  );
};

export default Header;
