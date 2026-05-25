import { useState } from 'react'
import './RegisterPage.css'
import { authApi } from '../../api/auth.api'

interface RegisterPageProps {
  onRegister: () => void
  onGoLogin: () => void
  onBack: () => void
}

export function RegisterPage({ onRegister, onGoLogin, onBack }: RegisterPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password || !confirm) {
      setError('Completează toate câmpurile.')
      return
    }
    if (password !== confirm) {
      setError('Parolele nu se potrivesc.')
      return
    }
    if (password.length < 8) {
      setError('Parola trebuie să aibă cel puțin 8 caractere.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await authApi.register({ name, email, password })
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      onRegister()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Înregistrarea a eșuat.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <button className="auth-back-btn" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Înapoi
      </button>

      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo__mark">WL</span>
          <span className="auth-logo__name">WhisperLink</span>
        </div>

        <h1 className="auth-title">Creează cont</h1>
        <p className="auth-subtitle">Alătură-te comunității WhisperLink</p>

        {/* Social login buttons */}
        <div className="social-buttons">
          <button className="social-btn social-btn--google" type="button">
            <svg viewBox="0 0 24 24" className="social-btn__icon">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Înregistrare cu Google
          </button>

          <button className="social-btn social-btn--facebook" type="button">
            <svg viewBox="0 0 24 24" className="social-btn__icon" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Înregistrare cu Facebook
          </button>

          <button className="social-btn social-btn--apple" type="button">
            <svg viewBox="0 0 24 24" className="social-btn__icon" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Înregistrare cu Apple
          </button>
        </div>

        <div className="auth-divider">
          <span className="auth-divider__line" />
          <span className="auth-divider__text">sau cu email</span>
          <span className="auth-divider__line" />
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="auth-error">{error}</p>}

          <div className="field-group">
            <label className="field-group__label" htmlFor="reg-name">Nume complet</label>
            <input
              id="reg-name"
              className="field-group__input"
              type="text"
              placeholder="Ion Popescu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="field-group">
            <label className="field-group__label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              className="field-group__input"
              type="email"
              placeholder="tu@exemplu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field-group">
            <label className="field-group__label" htmlFor="reg-password">Parolă</label>
            <div className="field-group__pass-wrap">
              <input
                id="reg-password"
                className="field-group__input"
                type={showPass ? 'text' : 'password'}
                placeholder="Minim 8 caractere"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="field-group__eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'Ascunde parola' : 'Arată parola'}
              >
                {showPass ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="field-group">
            <label className="field-group__label" htmlFor="reg-confirm">Confirmă parola</label>
            <input
              id="reg-confirm"
              className="field-group__input"
              type={showPass ? 'text' : 'password'}
              placeholder="Repetă parola"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <p className="auth-terms">
            Creând un cont ești de acord cu{' '}
            <button type="button" className="auth-switch__link">Termenii de serviciu</button>
            {' '}și{' '}
            <button type="button" className="auth-switch__link">Politica de confidențialitate</button>.
          </p>

          <button className="auth-submit-btn" type="submit" disabled={loading}>
            {loading ? 'Se încarcă...' : 'Creează contul'}
          </button>
        </form>

        <p className="auth-switch">
          Ai deja cont?{' '}
          <button type="button" className="auth-switch__link" onClick={onGoLogin}>
            Conectează-te
          </button>
        </p>
      </div>
    </div>
  )
}
