import { useState } from 'react'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Language from './pages/Language'
import ChiefComplaint from './pages/ChiefComplaint'
import Consent from './pages/Consent'


function App() {
  const [screen, setScreen] = useState('home')
  const [patientId, setPatientId] = useState('')
  const [passcode, setPasscode] = useState('')
  const [language, setLanguage] = useState('')
  const [complaint, setComplaint] = useState('')
  const [customComplaint, setCustomComplaint] = useState('')
  const [consent, setConsent] = useState(false)

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <div className="logo">
          <div className="logo-icon">M</div>
          <span>MediKiosk</span>
        </div>
      </header>

      {/* HOME */}

      {screen === 'home' && (
        <Home
          onNext={() => setScreen('login')}
        />
      )}
      {/* LOGIN */}

{screen === 'login' && (
  <Login
  patientId={patientId}
  setPatientId={setPatientId}
  passcode={passcode}
  setPasscode={setPasscode}
  onNext={() => setScreen('consent')}
  onBack={() => setScreen('home')}
/>
)}
{/* CONSENT */}

{screen === 'consent' && (
  <Consent
    consent={consent}
    setConsent={setConsent}
    onNext={() => setScreen('language')}
    onBack={() => setScreen('login')}
  />
)}


      {/* LANGUAGE */}

      {screen === 'language' && (
        <Language
          language={language}
          setLanguage={setLanguage}
          onNext={() => setScreen('complaint')}
          onBack={() => setScreen('home')}
        />
      )}

      {/* CHIEF COMPLAINT */}

      {screen === 'complaint' && (
        <ChiefComplaint
        language={language}
          complaint={complaint}
          setComplaint={setComplaint}
          customComplaint={customComplaint}
          setCustomComplaint={setCustomComplaint}
          onNext={() => setScreen('interview')}
          onBack={() => setScreen('language')}
        />
      )}

      {/* TEMPORARY INTERVIEW */}

      {screen === 'interview' && (
        <main className="screen">

          <div className="screen-heading">

            <div className="success-icon">
              ✓
            </div>

            <h1>Ready for your interview</h1>

            <p>
              We'll now ask you a few questions about your concern.
            </p>

          </div>

          <div className="summary-box">

            <p>
              <strong>Language:</strong> {language}
            </p>

            <p>
              <strong>Main issue:</strong> {complaint}
            </p>

          </div>

          <p className="handoff">
            Interview screen will be connected with Person 2's work.
          </p>

        </main>
      )}

    </div>
  )
}

export default App