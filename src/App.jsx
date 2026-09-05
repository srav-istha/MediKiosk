import React, { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Consent from './pages/Consent';
import Language from './pages/Language';
import ChiefComplaint from './pages/ChiefComplaint';
import InterviewScreen from './components/InterviewScreen';
import StructuredHistory from './components/StructuredHistory';
import DoctorSummary from './components/DoctorSummary';

import { questionTree, SECTIONS } from './data/questionTree';
import './index.css';

export default function App() {
  const [screen, setScreen] = useState('home');

  // Onboarding state (Person 1)
  const [patientId, setPatientId] = useState('MEDI-1024');
  const [passcode, setPasscode] = useState('1234');
  const [consent, setConsent] = useState(false);
  const [language, setLanguage] = useState('English');
  const [complaint, setComplaint] = useState('');
  const [customComplaint, setCustomComplaint] = useState('');

  // Interview state (Person 2 & Person 3)
  const [answers, setAnswers] = useState({});

  // AI Doctor Summary state (Person 4 & Person 5)
  const [summaryData, setSummaryData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleStartInterview = () => {
    const finalComplaint = customComplaint.trim() || complaint;
    if (finalComplaint && !answers.cc_1) {
      setAnswers((prev) => ({
        ...prev,
        cc_1: finalComplaint,
      }));
    }
    setScreen('interview');
  };

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    const finalComplaint = customComplaint.trim() || complaint || 'Stomach Pain';

    const payload = {
      patient_id: patientId || 'MEDI-1024',
      chief_complaint: finalComplaint,
      language: language || 'English',
      structured_history: {
        "Chief Complaint": { cc_1: { question: "Main Health Concern", formatted: finalComplaint } },
        "Clinical Questionnaire": answers
      }
    };

    try {
      const res = await fetch('http://localhost:8000/api/summary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setSummaryData(data);
      } else {
        throw new Error('Backend offline');
      }
    } catch (err) {
      // Fallback local summary generator if backend server is offline
      setSummaryData({
        patient_id: patientId || 'MEDI-1024',
        summary_text: `PATIENT PRE-CONSULTATION SUMMARY (SBAR)\nSITUATION: Patient ${patientId} presents with ${finalComplaint}.\nBACKGROUND: Pre-consultation kiosk interview completed in ${language}.\nASSESSMENT: Pre-consultation history gathered across 8 clinical sections.\nRECOMMENDATION: Clinical examination and physician review recommended.`,
        clinical_flags: [
          `Chief Complaint: ${finalComplaint}`,
          `Language Selected: ${language}`,
          `Pre-consultation history completed`
        ],
        sbar: {
          situation: `Patient presents with chief complaint of '${finalComplaint}'.`,
          background: `Pre-consultation kiosk interview completed in ${language}.`,
          assessment: `Chief Complaint: ${finalComplaint}\nQuestionnaire answers recorded for clinical review.`,
          recommendation: `Physician examination and diagnostic workup recommended.`
        }
      });
    } finally {
      setLoadingSummary(false);
      setScreen('doctor-summary');
    }
  };

  const handleReset = () => {
    setScreen('home');
    setPatientId('MEDI-1024');
    setPasscode('1234');
    setConsent(false);
    setLanguage('English');
    setComplaint('');
    setCustomComplaint('');
    setAnswers({});
    setSummaryData(null);
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
          onGenerateSummary={handleGenerateSummary}
          loadingSummary={loadingSummary}
        />
      )}

      {/* SCREEN 8: AI DOCTOR SUMMARY (DOCTOR REVIEW SECTION) */}
      {screen === 'doctor-summary' && (
        <DoctorSummary
          summaryData={summaryData}
          patientId={patientId}
          chiefComplaint={customComplaint.trim() || complaint || 'Stomach Pain'}
          language={language}
          onReset={handleReset}
          onBack={() => setScreen('history')}
        />
      )}
    </div>
  );
}
