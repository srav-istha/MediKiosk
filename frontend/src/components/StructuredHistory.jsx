import React, { useCallback, useMemo } from 'react';

/** Section icons for visual hierarchy */
const SECTION_ICONS = {
  'Chief Complaint': '🎯',
  'History of Present Illness': '📋',
  'Past Medical History': '🏥',
  'Current Medications': '💊',
  'Allergies': '⚠️',
  'Family History': '👨‍👩‍👧‍👦',
  'Social History': '🏠',
  'Review of Systems': '🔍',
};

function formatAnswer(question, value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  switch (question.type) {
    case 'yes-no':
      return value === true ? 'Yes' : 'No';

    case 'scale':
      const labels = ['', 'Minimal', 'Minimal', 'Mild', 'Mild', 'Moderate', 'Moderate', 'Severe', 'Severe', 'Very Severe', 'Worst'];
      return `${value}/10 — ${labels[value] || ''}`;

    case 'multi-choice': {
      if (typeof value === 'object' && value.selected) {
        const parts = [...value.selected];
        if (value.other && value.other.trim()) {
          parts.push(`Other: ${value.other}`);
        }
        return parts.join(', ');
      }
      if (Array.isArray(value)) return value.join(', ');
      return String(value);
    }

    case 'body-diagram':
      return Array.isArray(value) ? value.map(id =>
        id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      ) : [];

    default:
      return String(value);
  }
}

export default function StructuredHistory({
  questions,
  sections,
  answers,
  selectedLanguage,
  onStartOver,
  onGoBack,
  onGenerateSummary,
  loadingSummary
}) {
  const sectionData = useMemo(() => {
    return sections
      .map(section => {
        const sectionQuestions = questions.filter(q => q.section === section);
        const items = sectionQuestions.map(q => ({
          question: q,
          answer: formatAnswer(q, answers[q.id]),
          hasAnswer: answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '',
        }));
        return { section, items };
      })
      .filter(s => s.items.length > 0);
  }, [questions, sections, answers]);

  const handleExportJSON = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      language: selectedLanguage?.name || 'English',
      interview: {},
    };

    sectionData.forEach(({ section, items }) => {
      exportData.interview[section] = {};
      items.forEach(({ question, answer }) => {
        exportData.interview[section][question.id] = {
          question: question.text,
          answer: answers[question.id],
          formatted: answer,
        };
      });
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medikiosk-history-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [sectionData, selectedLanguage, answers]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="structured-history screen">
      {/* Header */}
      <div className="history-header animate-slide-up">
        <div className="history-header__icon">✓</div>
        <h1 className="history-header__title">Interview Complete</h1>
        <p className="history-header__subtitle">
          Please review your responses below to make sure everything is accurate before doctor review.
        </p>
      </div>

      {/* Verification Prompt */}
      <div className="history-verify-prompt">
        <p className="history-verify-prompt__text">
          📝 Please verify: Have you mentioned everything you want the doctor to know?
        </p>
      </div>

      {/* Sections */}
      {sectionData.map(({ section, items }) => (
        <div key={section} className="history-section">
          <h2 className="history-section__title">
            <span className="history-section__icon">{SECTION_ICONS[section] || '📄'}</span>
            {section}
          </h2>

          {items.map(({ question, answer, hasAnswer }) => (
            <div key={question.id} className="history-item">
              <span className="history-item__question">{question.text}</span>

              {!hasAnswer ? (
                <span className="history-item__answer history-item__answer--empty">
                  Not answered
                </span>
              ) : question.type === 'body-diagram' && Array.isArray(answer) ? (
                <div className="history-item__answer history-item__answer--body-regions">
                  {answer.map(region => (
                    <span key={region} className="body-region-tag">
                      {region}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="history-item__answer">{answer}</span>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Primary Doctor Summary Trigger */}
      {onGenerateSummary && (
        <div className="summary-trigger-box">
          <button
            className="primary-button doctor-summary-btn"
            onClick={onGenerateSummary}
            disabled={loadingSummary}
          >
            {loadingSummary ? '⏳ Generating AI Doctor Summary...' : '👨‍⚕️ Proceed to Doctor Review & AI Summary →'}
          </button>
        </div>
      )}

      {/* Secondary Action Buttons */}
      <div className="history-actions">
        <button
          id="btn-go-back"
          className="btn-action btn-action--secondary"
          onClick={onGoBack}
        >
          ← Go Back & Edit
        </button>
        <button
          id="btn-print"
          className="btn-action btn-action--secondary"
          onClick={handlePrint}
        >
          🖨️ Print Report
        </button>
        <button
          id="btn-export-json"
          className="btn-action btn-action--secondary"
          onClick={handleExportJSON}
        >
          📥 Export JSON
        </button>
        <button
          id="btn-start-over"
          className="btn-action btn-action--danger"
          onClick={onStartOver}
        >
          🔄 Start New Patient
        </button>
      </div>
    </div>
  );
}
