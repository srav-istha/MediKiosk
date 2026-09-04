function Login({
  patientId,
  setPatientId,
  passcode,
  setPasscode,
  onNext,
  onBack,
}) {
  const handleSubmit = (e) => {
    e.preventDefault()

    if (patientId.trim() && passcode.trim()) {
      onNext()
    }
  }

  return (
    <main className="login-screen">

      <div className="login-card">

        <div className="login-icon">
          M
        </div>

        <div className="login-heading">
          <span>MEDIKIOSK</span>
          <h1>Patient Login</h1>
          <p>
            Enter your details to continue your pre-consultation.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="patientId">
              Patient ID
            </label>

            <input
              id="patientId"
              type="text"
              placeholder="Enter your patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="passcode">
              Passcode
            </label>

            <input
              id="passcode"
              type="password"
              placeholder="Enter your passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="primary-button login-button"
            disabled={!patientId.trim() || !passcode.trim()}
          >
            Continue
            <span>→</span>
          </button>

        </form>

        <div className="demo-text">
          Demo: <strong>MEDI-1024</strong> / <strong>1234</strong>
        </div>

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

export default Login