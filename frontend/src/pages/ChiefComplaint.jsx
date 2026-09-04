const commonIssues = [
  {
    value: 'Headache',
    icons: '🤕',
    English: 'Headache',
    Telugu: 'తలనొప్పి',
    Hindi: 'सिरदर्द',
  },
  {
    value: 'Fever',
    icons: '🤒',
    English: 'Fever',
    Telugu: 'జ్వరం',
    Hindi: 'बुखार',
  },
  {
    value: 'Stomach Pain',
    icons: '🫃',
    English: 'Stomach Pain',
    Telugu: 'కడుపు నొప్పి',
    Hindi: 'पेट दर्द',
  },
  {
    value: 'Cough',
    icons: '😮‍💨',
    English: 'Cough',
    Telugu: 'దగ్గు',
    Hindi: 'खांसी',
  },
  {
    value: 'Chest Pain',
    icons: '❤️',
    English: 'Chest Pain',
    Telugu: 'ఛాతీ నొప్పి',
    Hindi: 'सीने में दर्द',
  },
  {
    value: 'Nausea',
    icons: '🤢',
    English: 'Nausea',
    Telugu: 'వికారం',
    Hindi: 'मतली',
  },
  {
    value: 'Cold / Congestion',
    icons: '🤧',
    English: 'Cold / Congestion',
    Telugu: 'జలుబు / ముక్కు దిబ్బడ',
    Hindi: 'सर्दी / नाक बंद',
  },
  {
    value: 'Other Pain',
    icons: '🩹',
    English: 'Other Pain',
    Telugu: 'ఇతర నొప్పి',
    Hindi: 'अन्य दर्द',
  },
]

function ChiefComplaint({
  language,
  complaint,
  setComplaint,
  customComplaint,
  setCustomComplaint,
  onNext,
  onBack,
}) {
  const translations = {
    English: {
      title: 'What brings you here today?',
      description:
        'Select the main issue you would like to discuss with the doctor.',
      other: "Can't find your issue?",
      placeholder: 'Type your problem here...',
      continue: 'Continue',
      back: 'Back',
    },

    Telugu: {
      title: 'ఈరోజు మిమ్మల్ని ఇక్కడికి తీసుకువచ్చిన సమస్య ఏమిటి?',
      description:
        'మీరు డాక్టర్‌తో చర్చించాలనుకుంటున్న ప్రధాన సమస్యను ఎంచుకోండి.',
      other: 'మీ సమస్య కనిపించలేదా?',
      placeholder: 'మీ సమస్యను ఇక్కడ టైప్ చేయండి...',
      continue: 'కొనసాగించండి',
      back: 'వెనుకకు',
    },

    Hindi: {
      title: 'आज आपको यहाँ किस समस्या के कारण आना पड़ा?',
      description:
        'वह मुख्य समस्या चुनें जिसके बारे में आप डॉक्टर से चर्चा करना चाहते हैं।',
      other: 'आपकी समस्या नहीं मिली?',
      placeholder: 'अपनी समस्या यहाँ लिखें...',
      continue: 'जारी रखें',
      back: 'वापस',
    },
  }

  const currentText =
    translations[language] || translations.English

  const selectIssue = (issue) => {
    setComplaint(issue.value)
    setCustomComplaint('')
  }

  const handleCustomComplaint = (e) => {
    setCustomComplaint(e.target.value)
    setComplaint(e.target.value)
  }

  return (
    <main className="screen">

      <div className="screen-heading">

        <span className="step">STEP 3</span>

        <h1>{currentText.title}</h1>

        <p>{currentText.description}</p>

      </div>

      <div className="issues-grid">

        {commonIssues.map((issue) => (
          <button
            key={issue.value}
            className={`issue-card ${
              complaint === issue.value ? 'selected' : ''
            }`}
            onClick={() => selectIssue(issue)}
          >

            <span className="issue-icon">
              {issue.icons}
            </span>

            <span>
              {issue[language] || issue.English}
            </span>

            {complaint === issue.value && (
              <span className="check">✓</span>
            )}

          </button>
        ))}

      </div>

      <div className="custom-section">

        <p>{currentText.other}</p>

        <textarea
          placeholder={currentText.placeholder}
          value={customComplaint}
          onChange={handleCustomComplaint}
        />

      </div>

      <button
        className="primary-button continue-button"
        disabled={!complaint.trim()}
        onClick={onNext}
      >
        {currentText.continue}
        <span>→</span>
      </button>

      <button
        className="back-button"
        onClick={onBack}
      >
        ← {currentText.back}
      </button>

    </main>
  )
}

export default ChiefComplaint