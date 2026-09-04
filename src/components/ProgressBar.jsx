import React from 'react';

/**
 * ProgressBar — Segmented progress bar showing clinical sections.
 * Current section highlighted, completed sections filled.
 */
export default function ProgressBar({ sections, currentSectionIndex, sectionProgress }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        {sections.map((section, index) => {
          let className = 'progress-segment';
          if (index < currentSectionIndex) {
            className += ' completed';
          } else if (index === currentSectionIndex) {
            className += ' active';
          }

          return (
            <div
              key={section}
              className={className}
              style={
                index === currentSectionIndex
                  ? { '--progress': `${sectionProgress}%` }
                  : undefined
              }
              title={section}
            />
          );
        })}
      </div>
      <div className="progress-labels">
        {sections.map((section, index) => {
          let className = 'progress-label';
          if (index < currentSectionIndex) className += ' completed';
          if (index === currentSectionIndex) className += ' active';

          // Abbreviate long section names for display
          const shortName = section
            .replace('History of Present Illness', 'HPI')
            .replace('Past Medical History', 'PMH')
            .replace('Current Medications', 'Meds')
            .replace('Review of Systems', 'ROS')
            .replace('Chief Complaint', 'Chief')
            .replace('Family History', 'Family')
            .replace('Social History', 'Social');

          return (
            <span key={section} className={className}>
              {shortName}
            </span>
          );
        })}
      </div>
    </div>
  );
}
