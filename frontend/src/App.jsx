import React, { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Consent from './pages/Consent';
import Language from './pages/Language';
import ChiefComplaint from './pages/ChiefComplaint';
import InterviewScreen from './components/InterviewScreen';
import StructuredHistory from './components/StructuredHistory';

import { questionTree, SECTIONS } from './data/questionTree';
import './index.css';

export default function App() {
  const [screen, setScreen] = useState('home');

  // Onboarding state
  const [patientId, setPatientId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [consent, setConsent] = useState(false);
  const [language, setLanguage] = useState('English');
  const [complaint, setComplaint] = useState('');
  const [customComplaint, setCustomComplaint] = useState('');

  // Questionnaire state
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleStartInterview = () => {
    // Pre-fill Chief Complaint into questionnaire answer cc_1 if not already answered
    const finalComplaint = customComplaint.trim() || complaint;
    if (finalComplaint && !answers.cc_1) {
      setAnswers((prev) => ({
        ...prev,
        cc_1: finalComplaint,
      }));
    }
    setScreen('interview');
  };

  const handleReset = () => {
    setScreen('home');
    setPatientId('');
    setPasscode('');
    setConsent(false);
    setLanguage('English');
    setComplaint('');
    setCustomComplaint('');
    setAnswers({});
  };

  return (
    <div className="app-container">
      {/* GLOBAL KIOSK HEADER */}
      <header className="app-header">
        <div className="header-brand" onClick={handleReset} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">M</div>
          <span className="logo-title">MediKiosk</span>
        </div>
        <div className="header-meta">
          {language && <span className="badge badge-lang">🌐 {language}</span>}
          {patientId && <span className="badge badge-patient">👤 {patientId}</span>}
        </div>
      </header>

      {/* SCREEN 1: HOME */}
      {screen === 'home' && (
        <Home onNext={() => setScreen('login')} />
      )}

      {/* SCREEN 2: LOGIN */}
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

      {/* SCREEN 3: CONSENT */}
      {screen === 'consent' && (
        <Consent
          consent={consent}
          setConsent={setConsent}
          onNext={() => setScreen('language')}
          onBack={() => setScreen('login')}
        />
      )}

      {/* SCREEN 4: LANGUAGE */}
      {screen === 'language' && (
        <Language
          language={language}
          setLanguage={setLanguage}
          onNext={() => setScreen('complaint')}
          onBack={() => setScreen('consent')}
        />
      )}

      {/* SCREEN 5: CHIEF COMPLAINT */}
      {screen === 'complaint' && (
        <ChiefComplaint
          language={language}
          complaint={complaint}
          setComplaint={setComplaint}
          customComplaint={customComplaint}
          setCustomComplaint={setCustomComplaint}
          onNext={handleStartInterview}
          onBack={() => setScreen('language')}
        />
      )}

      {/* SCREEN 6: MEDICAL QUESTIONNAIRE INTERVIEW */}
      {screen === 'interview' && (
        <InterviewScreen
          questions={questionTree}
          sections={SECTIONS}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onFinish={() => setScreen('history')}
        />
      )}

      {/* SCREEN 7: STRUCTURED CLINICAL HISTORY REPORT */}
      {screen === 'history' && (
        <StructuredHistory
          answers={answers}
          questions={questionTree}
          sections={SECTIONS}
          selectedLanguage={{ name: language }}
          onGoBack={() => setScreen('interview')}
          onStartOver={handleReset}
        />
      )}
    </div>
  );
}
