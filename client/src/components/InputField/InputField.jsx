import React from 'react';
import './InputField.scss';

const InputField = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="input-field">
      {label && <label className="input-field__label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field__input"
      />
    </div>
  );
};

export default InputField;
