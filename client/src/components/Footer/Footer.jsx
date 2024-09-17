import React from 'react';
import './Footer.scss';

// The currentQuestion prop is passed down from the parent (QuizPage)
const Footer = ({ currentQuestion }) => {
  return (
    <div className="footer">
      <p className="footer__progress">{currentQuestion}/10</p>
    </div>
  );
};

export default Footer;
