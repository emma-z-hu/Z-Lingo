import React from 'react';
import './MultipleChoiceOption.scss';

// Each option is rendered from the data passed from QuizPage
const MultipleChoiceOption = ({ option, onSelect }) => {
  return (
    <div className="multiple-choice-option" onClick={() => onSelect(option)}>
      {option}
    </div>
  );
};

export default MultipleChoiceOption;
