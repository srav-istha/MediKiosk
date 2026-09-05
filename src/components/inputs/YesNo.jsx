import React from 'react';

/**
 * YesNo — Two large Yes/No buttons with icons.
 * Value: true (yes) or false (no).
 */
const YesNo = ({ question, value, onChange }) => {
  return (
    <div className="input-yes-no">
      <button
        type="button"
        className={`yes-no-btn yes-no-btn--yes ${value === true ? 'selected' : ''}`}
        onClick={() => onChange(true)}
      >
        <span className="yes-no-btn__icon">✓</span>
        <span className="yes-no-btn__label">Yes</span>
      </button>

      <button
        type="button"
        className={`yes-no-btn yes-no-btn--no ${value === false ? 'selected' : ''}`}
        onClick={() => onChange(false)}
      >
        <span className="yes-no-btn__icon">✕</span>
        <span className="yes-no-btn__label">No</span>
      </button>
    </div>
  );
};

export default YesNo;
