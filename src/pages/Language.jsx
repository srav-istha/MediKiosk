import { languages } from '../data/languages';

const translations = {
  English: {
    title: 'Select your language',
    description: 'Choose the language you are most comfortable communicating in.',
    continue: 'Continue',
    back: 'Back',
  },
  Hindi: {
    title: 'अपनी भाषा चुनें',
    description: 'वह भाषा चुनें जिसमें आप बातचीत करने में सबसे सहज महसूस करते हैं।',
    continue: 'जारी रखें',
    back: 'वापस',
  },
  Telugu: {
    title: 'మీ భాషను ఎంచుకోండి',
    description: 'మీరు మాట్లాడటానికి సౌకర్యంగా ఉన్న భాషను ఎంచుకోండి.',
    continue: 'కొనసాగించండి',
    back: 'వెనుకకు',
  },
  Bengali: {
    title: 'আপনার ভাষা নির্বাচন করুন',
    description: 'যে ভাষায় আপনি কথা বলতে সবচেয়ে স্বাচ্ছন্দ্যবোধ করেন তা বেছে নিন।',
    continue: 'এগিয়ে যান',
    back: 'পিছনে',
  },
  Tamil: {
    title: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    description: 'நீங்கள் உரையாட மிகவும் வசதியான மொழியைத் தேர்ந்தெடுக்கவும்.',
    continue: 'தொடரவும்',
    back: 'பின்னால்',
  },
};

function Language({ language, setLanguage, onNext, onBack }) {
  const currentText = translations[language] || translations.English;

  return (
    <main className="screen">
      <div className="screen-heading">
        <span className="step">STEP 3 • LANGUAGE</span>
        <h1>{currentText.title}</h1>
        <p>{currentText.description}</p>
      </div>

      <div className="language-grid">
        {languages.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`language-card ${language === item.name ? 'selected' : ''}`}
            onClick={() => setLanguage(item.name)}
          >
            <div className="language-icon-badge">
              {item.nativeName.charAt(0)}
            </div>
            <div className="language-labels">
              <span className="native-name">{item.nativeName}</span>
              <span className="english-name">{item.name}</span>
            </div>
            {language === item.name && <span className="check">✓</span>}
          </button>
        ))}
      </div>

      <div className="action-row">
        <button className="back-button" onClick={onBack}>
          ← {currentText.back}
        </button>
        <button
          className="primary-button continue-button"
          disabled={!language}
          onClick={onNext}
        >
          {currentText.continue}
          <span>→</span>
        </button>
      </div>
    </main>
  );
}

export default Language;
