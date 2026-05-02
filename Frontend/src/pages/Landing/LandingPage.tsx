import './LandingPage.css'

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo" >
          <span className="landing-logo__mark">WL</span>
          <span className="landing-logo__name">WhisperLink</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">v1.0 — Visual Chat Platform</span>
          <h1 className="hero-title">
            Connect in{' '}
            <span className="hero-title--accent">Whispers</span>,<br />
            Build at Scale
          </h1>
          <p className="hero-subtitle">
            A modern real-time messaging workspace. Fast, clean,
            and ready for backend integration.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onEnter}>
              Open Chat
              <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat__value">Real-Time</span>
              <span className="stat__label">Messaging</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__value">Multi-View</span>
              <span className="stat__label">Navigation</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__value">API Ready</span>
              <span className="stat__label">Backend Hooks</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="chat-preview">
            <div className="chat-preview__bar">
              <div className="dot dot--red" />
              <div className="dot dot--yellow" />
              <div className="dot dot--green" />
              <span className="chat-preview__bar-label">WhisperLink</span>
            </div>
            <div className="chat-preview__messages">
              <div className="msg msg--in">
                <div className="msg__bubble">The new layout looks premium!</div>
                <span className="msg__time">09:02</span>
              </div>
              <div className="msg msg--out">
                <div className="msg__bubble">Built for speed and clarity.</div>
                <span className="msg__time">09:04</span>
              </div>
              <div className="msg msg--in">
                <div className="msg__bubble">Ready for the backend?</div>
                <span className="msg__time">09:06</span>
              </div>
              <div className="msg msg--out">
                <div className="msg__bubble">Always. Just connect the API.</div>
                <span className="msg__time">09:07</span>
              </div>
            </div>
            <div className="chat-preview__input">
              <span className="chat-preview__placeholder">Write a message...</span>
              <div className="chat-preview__send">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <p className="features-label">Everything you need</p>
        <h2 className="features-title">Built for modern teams</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="feature-card__title">Real-Time Chat</h3>
            <p className="feature-card__text">
              Instant messaging with typing indicators, read receipts, and live presence status.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="feature-card__title">Search Users</h3>
            <p className="feature-card__text">
              Find anyone quickly with smart search, filters, and instant profile results.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="feature-card__title">Smart Alerts</h3>
            <p className="feature-card__text">
              Stay on top of every message, mention, and update with organized notifications.
            </p>
          </div>
        </div>

      </section>
      <footer className="landing-footer">
        <span className="footer-brand">WhisperLink</span>
        <span className="footer-copy">Visual chat workspace · Frontend v1.0</span>
      </footer>
    </div>
  )
}
