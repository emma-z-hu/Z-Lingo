// import React from 'react';
// import './Footer.scss';

// const Footer = ({ currentQuestion }) => {
//   return (
//     <div className="footer">
//       <p className="footer__progress">{currentQuestion}/10</p>
//     </div>
//   );
// };

// export default Footer;


import React from 'react';
import './Footer.scss';

const Footer = ({ currentQuestionIndex, totalQuestions }) => {
  return (
    <footer className="footer">
      <p className="footer__text">
        Question {currentQuestionIndex + 1} / {totalQuestions}
      </p>
    </footer>
  );
};

export default Footer;
