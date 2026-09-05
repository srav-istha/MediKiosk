import React, { useState } from 'react';

/**
 * DoctorSummary component (Person 5 & Person 6 task)
 * Displays concise, AI-synthesized SBAR clinical summary for Doctor Review.
 * Enforces rule: NO autonomous diagnosis. Patient history synthesis for physician verification.
 */
export default function DoctorSummary({ summaryData, patientId, chiefComplaint, language, onReset, onBack }) {
  const [approved, setApproved] = useState(false);

  const sbar = summaryData?.sbar || {};
  const clinicalFlags = summaryData?.clinical_flags || [];

  return (
    <div className="doctor-summary-container screen animate-fade-in">
      <div className="summary-header">
        <div className="badge badge-doctor">👨‍⚕️ DOCTOR REVIEW SECTION</div>
        <h1>AI-Synthesized Pre-Consultation Summary</h1>
        <p className="subtitle">
          Objective clinical summary generated strictly from patient-entered history.
        </p>
      </div>

      <div className="patient-meta-banner">
        <div className="meta-item">
          <span className="meta-label">Patient ID:</span>
          <span className="meta-value">{patientId || 'MEDI-1024'}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Chief Complaint:</span>
          <span className="meta-value highlight">{chiefComplaint || 'Stomach Pain'}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Language:</span>
          <span className="meta-value">{language || 'English'}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Status:</span>
          <span className="meta-value status-ready">Ready for Physician Review</span>
        </div>
      </div>

      {/* Clinical Alert Flags */}
      {clinicalFlags.length > 0 && (
        <div className="flags-box">
          <h3>⚠️ Key Clinical Observations</h3>
          <ul>
            {clinicalFlags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SBAR Clinical History Cards */}
      <div className="sbar-grid">
        <div className="sbar-card">
          <h4>S — Situation</h4>
          <p>{sbar.situation || `Patient presents with chief complaint of ${chiefComplaint}`}</p>
        </div>

        <div className="sbar-card">
          <h4>B — Background</h4>
          <p>{sbar.background || `Pre-consultation kiosk interview completed in ${language}`}</p>
        </div>

        <div className="sbar-card full-width">
          <h4>A — Assessment & SOCRATES Findings</h4>
          <pre className="assessment-text">{sbar.assessment || summaryData?.summary_text || 'No history recorded.'}</pre>
        </div>

        <div className="sbar-card full-width">
          <h4>R — Recommendation</h4>
          <p>{sbar.recommendation || 'Physician examination & diagnostic workup recommended.'}</p>
        </div>
      </div>

      {/* Strict Medical Disclaimer Notice */}
      <div className="disclaimer-banner">
        🛡️ <strong>Physician Notice:</strong> This summary is an objective synthesis of patient-entered history. It contains NO autonomous diagnostic decision-making.
      </div>

      {/* Doctor Approval & Sign-Off */}
      <div className="doctor-approval-box">
        <label className="approval-checkbox">
          <input
            type="checkbox"
            checked={approved}
            onChange={(e) => setApproved(e.target.checked)}
          />
          <span>I have reviewed the synthesized patient history and am ready to begin consultation.</span>
        </label>

        <div className="action-row">
          <button className="back-button" onClick={onBack}>
            ← Back to Patient History
          </button>
          <button
            className={`primary-button ${approved ? 'approved-btn' : ''}`}
            disabled={!approved}
            onClick={() => {
              alert('Doctor review signed off! Returning to kiosk home screen.');
              onReset();
            }}
          >
            {approved ? '✓ Sign Off & Complete' : 'Review & Sign Off'}
          </button>
        </div>
      </div>
    </div>
  );
}
