import React from 'react';
import './MultipleChoiceOption.scss';

// Each option is rendered from the data passed from QuizPage
const MultipleChoiceOption = ({ option, isSelected, isCorrect, onSelect }) => {
  let className = 'multiple-choice-option';

  if (isSelected && isCorrect) {
    className += ' multiple-choice-option--correct';
  } else if (isSelected && !isCorrect) {
    className += ' multiple-choice-option--incorrect';
  } else if (isCorrect) {
    className += ' multiple-choice-option--correct';
  }

  return (
    <div className={className} onClick={() => onSelect(option)}>
      {option}
    </div>
  );
};

export default MultipleChoiceOption;
