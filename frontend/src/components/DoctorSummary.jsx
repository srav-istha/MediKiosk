import React from 'react';

export default function DoctorSummary({
  summary,
  onBack,
  onStartOver,
}) {
  return (
    <div className="doctor-summary screen">

      <div className="doctor-summary__header">

        <div className="doctor-summary__icon">
          ✓
        </div>

        <h1 className="doctor-summary__title">
          Doctor Summary
        </h1>

        <p className="doctor-summary__subtitle">
          AI-generated summary based on the patient's
          provided information
        </p>

      </div>


      <div className="doctor-summary__card">

        <div className="doctor-summary__content">

          {summary ? (
            summary.split('\n').map((line, index) => (
              <div
                key={index}
                style={{
                  minHeight:
                    line.trim() === ''
                      ? '0.6rem'
                      : 'auto',
                  fontWeight:
                    line.includes('━━━━━━━━') ||
                    line.includes('AI-GENERATED')
                      ? '600'
                      : '400',
                }}
              >
                {line || '\u00A0'}
              </div>
            ))
          ) : (
            <p>
              No summary available yet.
            </p>
          )}

        </div>

      </div>


      <div className="doctor-summary__notice">

        <strong>⚠️ Doctor Review Required</strong>

        <p>
          This summary contains information provided by
          the patient. It is intended to assist clinical
          review and does not replace professional
          medical judgment.
        </p>

      </div>


      <div className="doctor-summary__actions">

        <button
          className="btn-action"
          onClick={onBack}
        >
          ← Back to History
        </button>

        <button
          className="btn-action btn-action--danger"
          onClick={onStartOver}
        >
          ↻ Start New Interview
        </button>

      </div>

    </div>
  );
}