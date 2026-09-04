const languages = [
  { value: 'English', label: 'English', icon: 'A' },
  { value: 'Telugu', label: 'తెలుగు', icon: 'అ' },
  { value: 'Hindi', label: 'हिंदी', icon: 'अ' },
  { value: 'Other', label: 'Other', icon: '+' },
]

function Language({ language, setLanguage, onNext, onBack }) {
  const selectLanguage = (value) => {
    setLanguage(value)
  }

  const text = {
    English: {
      title: 'Select your language',
      description:
        'Choose the language you are most comfortable communicating in.',
      continue: 'Continue',
      back: 'Back',
    },

    Telugu: {
      title: 'మీ భాషను ఎంచుకోండి',
      description:
        'మీరు మాట్లాడటానికి సౌకర్యంగా ఉన్న భాషను ఎంచుకోండి.',
      continue: 'కొనసాగించండి',
      back: 'వెనుకకు',
    },

    Hindi: {
      title: 'अपनी भाषा चुनें',
      description:
        'वह भाषा चुनें जिसमें आप बात करने में सबसे सहज महसूस करते हैं।',
      continue: 'जारी रखें',
      back: 'वापस',
    },

    Other: {
      title: 'Select your language',
      description:
        'Choose the language you are most comfortable communicating in.',
      continue: 'Continue',
      back: 'Back',
    },
  }

  const currentText = text[language] || text.English

  return (
    <main className="screen">

      <div className="screen-heading">
        <span className="step">STEP 2</span>

        <h1>{currentText.title}</h1>

        <p>{currentText.description}</p>
      </div>

      <div className="language-grid">

        {languages.map((item) => (
          <button
            key={item.value}
            className={`language-card ${
              language === item.value ? 'selected' : ''
            }`}
            onClick={() => selectLanguage(item.value)}
          >
            <span className="language-icon">
              {item.icon}
            </span>

            <span>{item.label}</span>

            {language === item.value && (
              <span className="check">✓</span>
            )}
          </button>
        ))}

      </div>

      <button
        className="primary-button continue-button"
        disabled={!language}
        onClick={onNext}
      >
        {currentText.continue}
        <span>→</span>
      </button>

      <button className="back-button" onClick={onBack}>
        ← {currentText.back}
      </button>

    </main>
  )
}

export default Language