import React from 'react';

/**
 * SingleChoice — Radio-button style card selector with large touch targets.
 */
const SingleChoice = ({ question, value, onChange }) => {
  return (
    <div className="input-single-choice">
      {(question?.options || []).map((option, idx) => {
        const isSelected = value === option;
        return (
          <button
            key={idx}
            type="button"
            className={`choice-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onChange(option)}
          >
            <span className="choice-card__radio" />
            <span className="choice-card__label">{option}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SingleChoice;
