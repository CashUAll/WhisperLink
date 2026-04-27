import { useState } from 'react'
import './AddFriendView.css'

interface SuggestedUser {
  id: string
  name: string
  handle: string
  role: string
  initials: string
  accent: string
  mutualFriends: number
}

interface PendingRequest {
  id: string
  name: string
  handle: string
  initials: string
  accent: string
  sentAt: string
}

const SUGGESTIONS: SuggestedUser[] = [
  { id: 's1', name: 'Cristian Popa',   handle: '@cristian.dev', role: 'Full-Stack Developer', initials: 'CP', accent: '#6366f1', mutualFriends: 4 },
  { id: 's2', name: 'Ioana Marin',     handle: '@ioana.ux',    role: 'UX Researcher',       initials: 'IM', accent: '#ec4899', mutualFriends: 2 },
  { id: 's3', name: 'Vlad Dumitru',    handle: '@vlad.arch',   role: 'Software Architect',  initials: 'VD', accent: '#0ea5e9', mutualFriends: 6 },
  { id: 's4', name: 'Ana Constantin',  handle: '@ana.ml',      role: 'ML Engineer',         initials: 'AC', accent: '#10b981', mutualFriends: 1 },
]

const PENDING_REQUESTS: PendingRequest[] = [
  { id: 'p1', name: 'Mihai Georgescu', handle: '@mihai.g', initials: 'MG', accent: '#f59e0b', sentAt: 'Ieri' },
  { id: 'p2', name: 'Laura Stancu',    handle: '@laura.s', initials: 'LS', accent: '#8a2be2', sentAt: 'Acum 3 zile' },
]

export function AddFriendView() {
  const [search, setSearch] = useState('')
  const [sent, setSent] = useState<Set<string>>(new Set())

  const filtered = SUGGESTIONS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.handle.toLowerCase().includes(search.toLowerCase()),
  )

  function sendRequest(id: string) {
    setSent((prev) => new Set(prev).add(id))
  }

  function cancelRequest(id: string) {
    setSent((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <div className="add-friend-view">
      {/* Header */}
      <div className="view-header">
        <div className="view-header__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div>
          <h2 className="view-header__title">Adaugă Prieteni</h2>
          <p className="view-header__sub">Caută și conectează-te cu alți utilizatori</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-bar__icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Caută după nume sau @handle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pending requests */}
      {PENDING_REQUESTS.length > 0 && (
        <section className="add-section">
          <h3 className="add-section__title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cereri trimise
          </h3>
          <div className="pending-list">
            {PENDING_REQUESTS.map((req) => (
              <div key={req.id} className="pending-card">
                <div
                  className="pending-card__avatar"
                  style={{ background: req.accent }}
                >
                  {req.initials}
                </div>
                <div className="pending-card__info">
                  <span className="pending-card__name">{req.name}</span>
                  <span className="pending-card__handle">{req.handle}</span>
                </div>
                <div className="pending-card__right">
                  <span className="pending-card__time">{req.sentAt}</span>
                  <button className="pending-cancel-btn">Anulează</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Suggestions */}
      <section className="add-section">
        <h3 className="add-section__title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Persoane recomandate
        </h3>

        <div className="suggestions-grid">
          {filtered.map((user) => {
            const isSent = sent.has(user.id)
            return (
              <div key={user.id} className="suggestion-card">
                <div
                  className="suggestion-card__avatar"
                  style={{ background: user.accent }}
                >
                  {user.initials}
                </div>
                <div className="suggestion-card__info">
                  <span className="suggestion-card__name">{user.name}</span>
                  <span className="suggestion-card__handle">{user.handle}</span>
                  <span className="suggestion-card__role">{user.role}</span>
                  <span className="suggestion-card__mutual">
                    {user.mutualFriends} prieteni comuni
                  </span>
                </div>
                <button
                  className={`add-btn ${isSent ? 'add-btn--sent' : ''}`}
                  onClick={() => (isSent ? cancelRequest(user.id) : sendRequest(user.id))}
                >
                  {isSent ? (
                    <>
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Cerere trimisă
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Adaugă prieten
                    </>
                  )}
                </button>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>Niciun utilizator găsit</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
