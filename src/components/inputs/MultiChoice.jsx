import React, { useState } from 'react';

/**
 * MultiChoice — Checkbox card selector with "Other" custom text option.
 * Value shape: { selected: string[], other: string }
 */
const MultiChoice = ({ question, value, onChange }) => {
  const [otherText, setOtherText] = useState(
    (typeof value === 'object' && value?.other) || ''
  );

  const selected = (typeof value === 'object' && value?.selected)
    ? value.selected
    : (Array.isArray(value) ? value : []);

  const isOtherSelected = selected.includes('__other__');

  const handleToggle = (option) => {
    let newSelected;
    if (selected.includes(option)) {
      newSelected = selected.filter(s => s !== option);
    } else {
      // Deselect "None of the above" when selecting anything else
      if (option !== 'None of the above') {
        newSelected = [...selected.filter(s => s !== 'None of the above'), option];
      } else {
        // Select "None of the above" clears everything else
        newSelected = ['None of the above'];
        setOtherText('');
        onChange({ selected: newSelected, other: '' });
        return;
      }
    }
    onChange({ selected: newSelected, other: isOtherSelected ? otherText : '' });
  };

  const handleOtherToggle = () => {
    if (isOtherSelected) {
      const newSelected = selected.filter(s => s !== '__other__');
      setOtherText('');
      onChange({ selected: newSelected, other: '' });
    } else {
      const newSelected = [...selected.filter(s => s !== 'None of the above'), '__other__'];
      onChange({ selected: newSelected, other: otherText });
    }
  };

  const handleOtherTextChange = (e) => {
    const text = e.target.value;
    setOtherText(text);
    onChange({ selected, other: text });
  };

  return (
    <div className="input-multi-choice">
      {(question?.options || []).map((option, idx) => (
        <div
          key={idx}
          className={`choice-card ${selected.includes(option) ? 'selected' : ''}`}
          onClick={() => handleToggle(option)}
          role="checkbox"
          aria-checked={selected.includes(option)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle(option);
            }
          }}
        >
          <span className="choice-card__checkbox" />
          <span className="choice-card__label">{option}</span>
        </div>
      ))}

      {/* Other option */}
      <div
        className={`choice-card ${isOtherSelected ? 'selected' : ''}`}
        onClick={handleOtherToggle}
        role="checkbox"
        aria-checked={isOtherSelected}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOtherToggle();
          }
        }}
      >
        <span className="choice-card__checkbox" />
        <span className="choice-card__label">Other</span>
      </div>

      {isOtherSelected && (
        <div className="other-input animate-slide-up">
          <input
            type="text"
            placeholder="Please specify..."
            value={otherText}
            onChange={handleOtherTextChange}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default MultiChoice;
