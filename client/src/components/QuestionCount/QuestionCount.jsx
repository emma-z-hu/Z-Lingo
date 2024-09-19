import React from 'react';
import './QuestionCount.scss';

const QuestionCount = ({ currentQuestionIndex, totalQuestions }) => {
  return (
    <div className="question-count">
      <p className="question-count__text">
        Question {currentQuestionIndex + 1} / {totalQuestions}
      </p>
    </div>
  );
};

export default QuestionCount;
