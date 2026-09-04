import React from 'react';
import { languages } from '../data/languages';

/**
 * LanguageSelect — Welcome screen with language picker grid.
 * Patient selects their preferred language before starting the interview.
 */
export default function LanguageSelect({ selectedLanguage, onSelectLanguage, onBegin }) {
  return (
    <div className="language-select screen">
      {/* Brand */}
      <div className="language-select__brand animate-slide-up">
        <div className="language-select__logo">
          <div className="language-select__logo-icon">🏥</div>
          <h1 className="language-select__title">MediKiosk</h1>
        </div>
        <p className="language-select__subtitle">
          Your health interview, simplified
        </p>
      </div>

      {/* Prompt */}
      <h2 className="language-select__prompt animate-fade-in">
        Select your preferred language
      </h2>

      {/* Language Grid */}
      <div className="language-grid">
        {languages.map((lang, index) => (
          <div
            key={lang.id}
            id={`lang-${lang.id}`}
            className={`language-card ${selectedLanguage?.id === lang.id ? 'selected' : ''}`}
            onClick={() => onSelectLanguage(lang)}
            style={{ animationDelay: `${index * 40}ms` }}
            role="button"
            tabIndex={0}
            aria-label={`Select ${lang.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectLanguage(lang);
              }
            }}
          >
            <span className="language-card__native">{lang.nativeName}</span>
            <span className="language-card__name">{lang.name}</span>
          </div>
        ))}
      </div>

      {/* Begin Button */}
      <button
        id="btn-begin-interview"
        className="btn-begin animate-fade-in"
        onClick={onBegin}
        disabled={!selectedLanguage}
      >
        Begin Interview →
      </button>
    </div>
  );
}
