import React, { useState, useCallback, useMemo } from 'react';
import { questionTree, SECTIONS } from './data/questionTree';
import LanguageSelect from './components/LanguageSelect';
import InterviewScreen from './components/InterviewScreen';
import StructuredHistory from './components/StructuredHistory';

/**
 * App — Root component managing 3 screens via state machine:
 *   'language-select' → 'interview' → 'summary'
 */
export default function App() {
  const [screen, setScreen] = useState('language-select');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [answers, setAnswers] = useState({});

  /**
   * Filter questions based on conditional rules.
   * A question is visible if it has no conditionalOn rule,
   * or if its condition is met by a prior answer.
   */
  const visibleQuestions = useMemo(() => {
    return questionTree.filter(q => {
      if (!q.conditionalOn) return true;
      const { questionId, value } = q.conditionalOn;
      return answers[questionId] === value;
    });
  }, [answers]);

  const handleLanguageSelect = useCallback((lang) => {
    setSelectedLanguage(lang);
  }, []);

  const handleBeginInterview = useCallback(() => {
    setScreen('interview');
  }, []);

  const handleAnswerChange = useCallback((questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const handleFinishInterview = useCallback(() => {
    setScreen('summary');
  }, []);

  const handleStartOver = useCallback(() => {
    setScreen('language-select');
    setSelectedLanguage(null);
    setAnswers({});
  }, []);

  const handleGoBackToInterview = useCallback(() => {
    setScreen('interview');
  }, []);

  return (
    <div className="app-container">
      {screen === 'language-select' && (
        <LanguageSelect
          selectedLanguage={selectedLanguage}
          onSelectLanguage={handleLanguageSelect}
          onBegin={handleBeginInterview}
        />
      )}

      {screen === 'interview' && (
        <InterviewScreen
          questions={visibleQuestions}
          sections={SECTIONS}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onFinish={handleFinishInterview}
        />
      )}

      {screen === 'summary' && (
        <StructuredHistory
          questions={visibleQuestions}
          sections={SECTIONS}
          answers={answers}
          selectedLanguage={selectedLanguage}
          onStartOver={handleStartOver}
          onGoBack={handleGoBackToInterview}
        />
      )}
    </div>
  );
}
