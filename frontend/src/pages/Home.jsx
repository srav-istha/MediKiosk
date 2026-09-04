function Home({ onNext }) {
  return (
    <main className="welcome-screen">
      <div className="welcome-content">

        <div className="welcome-icon">+</div>

        <h1>
          Welcome to <span>MediKiosk</span>
        </h1>

        <p>
          Your AI-assisted pre-consultation assistant.
          <br />
          Let's make your consultation easier.
        </p>

        <button className="primary-button" onClick={onNext}>
          Get Started
          <span>→</span>
        </button>

        <small>
          Your information will be handled securely.
        </small>

      </div>
    </main>
  )
}

export default Home