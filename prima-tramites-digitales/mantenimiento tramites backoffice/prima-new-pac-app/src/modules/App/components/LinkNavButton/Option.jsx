import React from 'react';

function Option({ text, icon }) {
  return (
    <div className="option-content">
      <img src={icon} className="icon" />
      <div className="text">{text}</div>
    </div>
  );
}

export default Option;
