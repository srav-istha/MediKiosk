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
import { generateDoctorSummary as generateAISummary } from './services/summaryService';

import './index.css';

export default function App() {
  const [screen, setScreen] = useState('home');

  // -----------------------------
  // ONBOARDING STATE
  // -----------------------------
  const [patientId, setPatientId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [consent, setConsent] = useState(false);
  const [language, setLanguage] = useState('English');
  const [complaint, setComplaint] = useState('');
  const [customComplaint, setCustomComplaint] = useState('');

  // -----------------------------
  // QUESTIONNAIRE STATE
  // -----------------------------
  const [answers, setAnswers] = useState({});

  // -----------------------------
  // DOCTOR SUMMARY STATE
  // -----------------------------
  const [doctorSummary, setDoctorSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  const handleAnswerChange = (questionId, value) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: value,
    }));
  };

  const handleStartInterview = () => {
    const finalComplaint =
      customComplaint.trim() || complaint;

    if (finalComplaint && !answers.cc_1) {
      setAnswers((previousAnswers) => ({
        ...previousAnswers,
        cc_1: finalComplaint,
      }));
    }

    setScreen('interview');
  };

  // ------------------------------------------------
  // Convert questionnaire values into readable text
  // ------------------------------------------------
  const formatValue = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === ''
    ) {
      return 'Not provided';
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return 'None reported';
      }

      return value
        .map((item) => formatValue(item))
        .join(', ');
    }

    if (typeof value === 'object') {
      if (value.label) {
        return value.label;
      }

      if (
        value.value !== undefined &&
        typeof value.value !== 'object'
      ) {
        return String(value.value);
      }

      if (value.name) {
        return value.name;
      }

      const readableParts = Object.entries(value)
        .map(([key, item]) => {
          const formattedItem = formatValue(item);

          if (
            formattedItem === 'Not provided' ||
            formattedItem === 'None reported'
          ) {
            return null;
          }

          return `${key}: ${formattedItem}`;
        })
        .filter(Boolean);

      return readableParts.length > 0
        ? readableParts.join(', ')
        : 'Not provided';
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return String(value);
  };

  // ------------------------------------------------
  // BUILD STRUCTURED CASE HISTORY
  // ------------------------------------------------
  const buildCaseHistory = () => {
    const interview = {};

    questionTree.forEach((question) => {
      const answer = answers[question.id];

      if (!interview[question.section]) {
        interview[question.section] = {};
      }

      interview[question.section][question.id] = {
        question: question.text,
        answer: answer ?? null,
        formatted: formatValue(answer),
      };
    });

    return {
      patientId: patientId || 'Not provided',
      language: language || 'English',
      chiefComplaint:
        customComplaint.trim() ||
        complaint ||
        formatValue(answers.cc_1),
      interview,
    };
  };

  // ------------------------------------------------
  // AI DOCTOR SUMMARY
  // ------------------------------------------------
  const generateDoctorSummary = async () => {
    setSummaryLoading(true);
    setSummaryError('');
    setDoctorSummary('');

    try {
      const caseHistory = buildCaseHistory();

      const summary = await generateAISummary(caseHistory);

      setDoctorSummary(summary);
      setScreen('doctor-summary');
    } catch (error) {
      console.error('Doctor summary generation failed:', error);

      setSummaryError(
        error.message ||
          'Unable to generate the doctor summary.'
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  // -----------------------------
  // RESET APPLICATION
  // -----------------------------
  const handleReset = () => {
    setScreen('home');
    setPatientId('');
    setPasscode('');
    setConsent(false);
    setLanguage('English');
    setComplaint('');
    setCustomComplaint('');
    setAnswers({});
    setDoctorSummary('');
    setSummaryLoading(false);
    setSummaryError('');
  };

  // -----------------------------
  // APPLICATION UI
  // -----------------------------
  return (
    <div className="app-container">

      {/* GLOBAL HEADER */}
      <header className="app-header">

        <div
          className="header-brand"
          onClick={handleReset}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-icon">M</div>

          <span className="logo-title">
            MediKiosk
          </span>
        </div>

        <div className="header-meta">

          {language && (
            <span className="badge badge-lang">
              🌐 {language}
            </span>
          )}

          {patientId && (
            <span className="badge badge-patient">
              👤 {patientId}
            </span>
          )}

        </div>

      </header>


      {/* SCREEN 1 — HOME */}
      {screen === 'home' && (
        <Home
          onNext={() => setScreen('login')}
        />
      )}


      {/* SCREEN 2 — LOGIN */}
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


      {/* SCREEN 3 — CONSENT */}
      {screen === 'consent' && (
        <Consent
          consent={consent}
          setConsent={setConsent}
          onNext={() => setScreen('language')}
          onBack={() => setScreen('login')}
        />
      )}


      {/* SCREEN 4 — LANGUAGE */}
      {screen === 'language' && (
        <Language
          language={language}
          setLanguage={setLanguage}
          onNext={() => setScreen('complaint')}
          onBack={() => setScreen('consent')}
        />
      )}


      {/* SCREEN 5 — CHIEF COMPLAINT */}
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


      {/* SCREEN 6 — MEDICAL INTERVIEW */}
      {screen === 'interview' && (
        <InterviewScreen
          questions={questionTree}
          sections={SECTIONS}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onFinish={() => setScreen('history')}
        />
      )}


      {/* SCREEN 7 — STRUCTURED HISTORY */}
      {screen === 'history' && (
        <StructuredHistory
          answers={answers}
          questions={questionTree}
          sections={SECTIONS}
          selectedLanguage={{ name: language }}
          onGoBack={() => setScreen('interview')}
          onStartOver={handleReset}
          onGenerateSummary={generateDoctorSummary}
        />
      )}


      {/* SUMMARY ERROR */}
      {summaryError && (
        <div
          className="doctor-summary__notice"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <strong>Unable to generate summary</strong>
          <p>{summaryError}</p>

          <button
            className="btn-action btn-action--secondary"
            onClick={() => setSummaryError('')}
          >
            Close
          </button>
        </div>
      )}


      {/* SUMMARY LOADING */}
      {summaryLoading && (
        <div
          className="screen"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div className="doctor-summary__icon">
            🩺
          </div>

          <h2 className="doctor-summary__title">
            Generating Doctor Summary
          </h2>

          <p className="doctor-summary__subtitle">
            Please wait while the AI prepares a concise
            summary from the patient's provided information.
          </p>
        </div>
      )}


      {/* SCREEN 8 — DOCTOR SUMMARY */}
      {screen === 'doctor-summary' && !summaryLoading && (
        <DoctorSummary
          summary={doctorSummary}
          onBack={() => setScreen('history')}
          onStartOver={handleReset}
        />
      )}

    </div>
  );
}