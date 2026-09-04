import React, { useRef, useEffect } from 'react';

/**
 * TextInput — Free-text textarea with auto-resize and character count.
 */
const TextInput = ({ question, value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(120, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [value]);

  return (
    <div className="input-text">
      <textarea
        ref={textareaRef}
        placeholder={question?.placeholder || 'Type your answer here...'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
      <div className="input-text__char-count">
        {(value || '').length} characters
      </div>
    </div>
  );
};

export default TextInput;
