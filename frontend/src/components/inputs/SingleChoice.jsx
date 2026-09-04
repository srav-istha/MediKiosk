import React from 'react';

/**
 * SingleChoice — Radio-button style card selector with large touch targets.
 */
const SingleChoice = ({ question, value, onChange }) => {
  return (
    <div className="input-single-choice">
      {(question?.options || []).map((option, idx) => (
        <div
          key={idx}
          className={`choice-card ${value === option ? 'selected' : ''}`}
          onClick={() => onChange(option)}
          role="radio"
          aria-checked={value === option}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onChange(option);
            }
          }}
        >
          <span className="choice-card__radio" />
          <span className="choice-card__label">{option}</span>
        </div>
      ))}
    </div>
  );
};

export default SingleChoice;
