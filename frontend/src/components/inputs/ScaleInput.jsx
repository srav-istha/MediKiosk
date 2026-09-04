import React from 'react';

/**
 * ScaleInput — Horizontal 1-10 severity/pain scale with color gradient.
 * Buttons 1-3: green, 4-6: yellow, 7-10: red.
 */
const ScaleInput = ({ question, value, onChange }) => {
  const getColor = (num) => {
    if (num <= 3) return '#22c55e';
    if (num <= 6) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="input-scale">
      <div className="scale-buttons">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
          const color = getColor(num);
          const isSelected = value === num;

          return (
            <button
              key={num}
              className={`scale-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onChange(num)}
              style={{
                borderColor: color,
                backgroundColor: isSelected ? color : 'transparent',
                color: isSelected ? 'white' : color,
              }}
              aria-label={`Severity ${num} out of 10`}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div className="scale-labels">
        <span>No pain</span>
        <span>Worst pain</span>
      </div>
    </div>
  );
};

export default ScaleInput;
