import { useState } from 'react'
import './FriendsView.css'

type FriendStatus = 'online' | 'away' | 'offline'

interface Friend {
  id: string
  name: string
  handle: string
  role: string
  initials: string
  accent: string
  status: FriendStatus
  mutualFriends: number
}

const FRIENDS: Friend[] = [
  { id: 'f1', name: 'Mara Popa',       handle: '@mara.ui',    role: 'Senior UI Designer',  initials: 'MP', accent: '#8a2be2', status: 'online',  mutualFriends: 5 },
  { id: 'f2', name: 'Radu Toma',       handle: '@radu.dev',   role: 'Frontend Engineer',   initials: 'RT', accent: '#0ea5e9', status: 'online',  mutualFriends: 3 },
  { id: 'f3', name: 'Bianca Luca',     handle: '@bianca.pm',  role: 'Product Manager',     initials: 'BL', accent: '#10b981', status: 'away',    mutualFriends: 8 },
  { id: 'f4', name: 'Sergiu Botezatu', handle: '@sergiu.be',  role: 'Backend Developer',   initials: 'SB', accent: '#f59e0b', status: 'offline', mutualFriends: 2 },
  { id: 'f5', name: 'Elena Ionescu',   handle: '@elena.qa',   role: 'QA Engineer',         initials: 'EI', accent: '#ec4899', status: 'offline', mutualFriends: 4 },
  { id: 'f6', name: 'Andrei Vlad',     handle: '@andrei.ds',  role: 'Data Scientist',      initials: 'AV', accent: '#6366f1', status: 'online',  mutualFriends: 1 },
]

const STATUS_ORDER: Record<FriendStatus, number> = { online: 0, away: 1, offline: 2 }

export function FriendsView() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'online'>('all')

  const visible = FRIENDS
    .filter((f) => {
      const matchSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.handle.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'all' || f.status === 'online'
      return matchSearch && matchFilter
    })
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])

  const onlineCount = FRIENDS.filter((f) => f.status === 'online').length

  return (
    <div className="friends-view">
      {/* Header */}
      <div className="view-header">
        <div className="view-header__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h2 className="view-header__title">Prieteni</h2>
          <p className="view-header__sub">{FRIENDS.length} prieteni · {onlineCount} online</p>
        </div>
      </div>

      {/* Filters */}
      <div className="friends-controls">
        <div className="friends-filter">
          <button
            className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Toți ({FRIENDS.length})
          </button>
          <button
            className={`filter-tab ${filter === 'online' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('online')}
          >
            <span className="online-dot" />
            Online ({onlineCount})
          </button>
        </div>

        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-bar__icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="search-bar__input"
            type="text"
            placeholder="Caută prieten..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Friends list */}
      <div className="friends-list">
        {visible.length === 0 && (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>Niciun prieten găsit</p>
          </div>
        )}

        {visible.map((friend) => (
          <div key={friend.id} className="friend-card">
            <div className="friend-card__avatar-wrap">
              <div
                className="friend-card__avatar"
                style={{ background: friend.accent }}
              >
                {friend.initials}
              </div>
              <span className={`presence-dot presence-dot--${friend.status}`} />
            </div>

            <div className="friend-card__info">
              <span className="friend-card__name">{friend.name}</span>
              <span className="friend-card__handle">{friend.handle}</span>
              <span className="friend-card__role">{friend.role}</span>
            </div>

            <div className="friend-card__meta">
              <span className="friend-card__mutual">{friend.mutualFriends} comuni</span>
              <span className={`status-badge status-badge--${friend.status}`}>
                {friend.status === 'online' ? 'Online' : friend.status === 'away' ? 'Plecat' : 'Offline'}
              </span>
            </div>

            <div className="friend-card__actions">
              <button className="friend-action friend-action--msg" title="Trimite mesaj">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="friend-action" title="Mai multe">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
