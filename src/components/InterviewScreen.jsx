import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import TextInput from './inputs/TextInput';
import SingleChoice from './inputs/SingleChoice';
import MultiChoice from './inputs/MultiChoice';
import YesNo from './inputs/YesNo';
import ScaleInput from './inputs/ScaleInput';
import BodyDiagram from './inputs/BodyDiagram';

/** Map of question type → React component */
const INPUT_MAP = {
  'text': TextInput,
  'single-choice': SingleChoice,
  'multi-choice': MultiChoice,
  'yes-no': YesNo,
  'scale': ScaleInput,
  'body-diagram': BodyDiagram,
};

/**
 * InterviewScreen — Main interview wizard.
 * Displays one question at a time with progress, navigation, and input validation.
 */
export default function InterviewScreen({ questions, sections, answers, onAnswerChange, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showError, setShowError] = useState(false);
  const [direction, setDirection] = useState('right'); // animation direction

  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  // Current section info
  const currentSectionIndex = useMemo(() => {
    if (!currentQuestion) return 0;
    return sections.indexOf(currentQuestion.section);
  }, [currentQuestion, sections]);

  // Calculate progress within current section
  const sectionProgress = useMemo(() => {
    if (!currentQuestion) return 0;
    const sectionQuestions = questions.filter(q => q.section === currentQuestion.section);
    const indexInSection = sectionQuestions.indexOf(currentQuestion);
    return ((indexInSection + 1) / sectionQuestions.length) * 100;
  }, [currentQuestion, questions]);

  // Current answer value
  const currentValue = currentQuestion ? answers[currentQuestion.id] : undefined;

  /** Check if current answer is valid */
  const isValid = useCallback(() => {
    if (!currentQuestion) return true;
    if (!currentQuestion.required) return true;

    const val = answers[currentQuestion.id];

    if (val === undefined || val === null || val === '') return false;

    // Multi-choice: at least one selected
    if (currentQuestion.type === 'multi-choice') {
      if (typeof val === 'object' && val.selected) {
        return val.selected.length > 0;
      }
      return Array.isArray(val) && val.length > 0;
    }

    // Body diagram: at least one region
    if (currentQuestion.type === 'body-diagram') {
      return Array.isArray(val) && val.length > 0;
    }

    return true;
  }, [currentQuestion, answers]);

  const handleNext = useCallback(() => {
    if (!isValid()) {
      setShowError(true);
      return;
    }
    setShowError(false);

    if (isLast) {
      onFinish();
    } else {
      setDirection('right');
      setCurrentIndex(prev => prev + 1);
    }
  }, [isValid, isLast, onFinish]);

  const handlePrev = useCallback(() => {
    if (!isFirst) {
      setShowError(false);
      setDirection('left');
      setCurrentIndex(prev => prev - 1);
    }
  }, [isFirst]);

  const handleChange = useCallback((value) => {
    if (currentQuestion) {
      onAnswerChange(currentQuestion.id, value);
      setShowError(false);
    }
  }, [currentQuestion, onAnswerChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext]);

  if (!currentQuestion) return null;

  const InputComponent = INPUT_MAP[currentQuestion.type];

  return (
    <div className="interview-screen screen">
      {/* Header */}
      <div className="interview-header">
        <div className="interview-header__top">
          <div className="interview-header__brand">
            <div className="interview-header__brand-icon">🏥</div>
            <span className="interview-header__brand-name">MediKiosk</span>
          </div>
          <span className="interview-header__counter">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          sections={sections}
          currentSectionIndex={currentSectionIndex}
          sectionProgress={sectionProgress}
        />
      </div>

      {/* Section Badge */}
      <div className="section-badge animate-fade-in" key={currentQuestion.section}>
        <span className="section-badge__dot" />
        {currentQuestion.section}
      </div>

      {/* Question Area */}
      <div
        className={`question-area ${direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'}`}
        key={currentQuestion.id}
      >
        <h2 className="question-text">
          {currentQuestion.text}
          {currentQuestion.required && <span className="question-required">*</span>}
        </h2>

        <div className="question-input-area">
          {InputComponent && (
            <InputComponent
              question={currentQuestion}
              value={currentValue}
              onChange={handleChange}
            />
          )}
        </div>

        {showError && (
          <div className="validation-error">
            ⚠ This question requires an answer
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="interview-nav">
        {isFirst ? (
          <div className="nav-spacer" />
        ) : (
          <button
            id="btn-prev"
            className="btn-nav btn-nav--prev"
            onClick={handlePrev}
          >
            ← Previous
          </button>
        )}

        <button
          id="btn-next"
          className={`btn-nav ${isLast ? 'btn-nav--finish' : 'btn-nav--next'}`}
          onClick={handleNext}
        >
          {isLast ? 'Finish ✓' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
