import React from 'react';

/**
 * YesNo — Two large Yes/No buttons with icons.
 * Value: true (yes) or false (no).
 */
const YesNo = ({ question, value, onChange }) => {
  return (
    <div className="input-yes-no">
      <div
        className={`yes-no-btn yes-no-btn--yes ${value === true ? 'selected' : ''}`}
        onClick={() => onChange(true)}
        role="radio"
        aria-checked={value === true}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(true);
          }
        }}
      >
        <span className="yes-no-btn__icon">✓</span>
        <span className="yes-no-btn__label">Yes</span>
      </div>

      <div
        className={`yes-no-btn yes-no-btn--no ${value === false ? 'selected' : ''}`}
        onClick={() => onChange(false)}
        role="radio"
        aria-checked={value === false}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(false);
          }
        }}
      >
        <span className="yes-no-btn__icon">✕</span>
        <span className="yes-no-btn__label">No</span>
      </div>
    </div>
  );
};

export default YesNo;
