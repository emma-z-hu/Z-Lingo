import React from 'react';
import './MultipleChoiceOption.scss';

const MultipleChoiceOption = ({ label, isSelected, isCorrect, isIncorrect, onClick }) => {
  let className = 'multiple-choice-option';
  if (isCorrect) className += ' correct';
  if (isIncorrect) className += ' incorrect';

  return (
    <button className={className} onClick={onClick} disabled={isSelected}>
      {label}
    </button>
  );
};

export default MultipleChoiceOption;
