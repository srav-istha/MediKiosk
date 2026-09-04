function Consent({ consent, setConsent, onNext, onBack }) {
  return (
    <main className="consent-screen">

      <div className="consent-card">

        <div className="consent-icon">
          ✓
        </div>

        <div className="consent-heading">
          <span>STEP 2</span>

          <h1>Your Consent</h1>

          <p>
            Before we begin, please review how your information
            will be used during this pre-consultation.
          </p>
        </div>

        <div className="consent-info">
          <div className="consent-item">
            <span>✓</span>
            <p>
              Your answers will be used to prepare a medical
              history for the doctor.
            </p>
          </div>

          <div className="consent-item">
            <span>✓</span>
            <p>
              Your information will be handled securely within
              the MediKiosk system.
            </p>
          </div>

          <div className="consent-item">
            <span>✓</span>
            <p>
              The generated summary is only a draft for
              doctor review and does not replace medical advice.
            </p>
          </div>
        </div>

        <label className="consent-checkbox">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />

          <span>
            I understand and consent to continue.
          </span>
        </label>

        <button
          className="primary-button consent-button"
          disabled={!consent}
          onClick={onNext}
        >
          Continue
          <span>→</span>
        </button>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

      </div>

    </main>
  )
}

export default Consent