import type { ChatUser, QuickAction, SideStat } from '../../../types'
import { Avatar } from '../../common'
import { getInitials, joinClassNames } from '../../../utils'
import './Sidebar.css'

interface SidebarProps {
  brandName: string
  brandCaption: string
  currentUser: ChatUser
  actions: QuickAction[]
  sideStats: SideStat[]
}

export function Sidebar({
  brandName,
  brandCaption,
  currentUser,
  actions,
  sideStats,
}: SidebarProps) {
  return (
    <aside id="chat-menu" className="side-panel">
      <div className="side-panel__top">
        <div className="brand-mark">WL</div>
        <div className="brand-copy">
          <h1 className="brand-copy__title">{brandName}</h1>
          <p className="brand-copy__text">{brandCaption}</p>
        </div>
      </div>

      <nav className="menu-list" aria-label="Chat actions">
        {actions.map((action, index) => (
          <button
            key={action.id}
            type="button"
            className={joinClassNames(
              'menu-btn',
              index === 0 && 'menu-btn--active',
              action.tone === 'primary' && 'menu-btn--accent',
            )}
            title={action.label}
          >
            <span className="menu-btn__icon">{getInitials(action.label)}</span>
            <span className="menu-btn__text">{action.label}</span>
          </button>
        ))}
      </nav>

      <section className="profile-box">
        <div className="profile-box__row">
          <Avatar
            name={currentUser.avatarText}
            label={currentUser.name}
            accent={currentUser.accent}
            status={currentUser.presence}
            size="md"
          />

          <div className="profile-box__info">
            <h2 className="profile-box__name">{currentUser.name}</h2>
            <p className="profile-box__role">{currentUser.role}</p>
          </div>
        </div>

        <div className="profile-box__stats">
          {sideStats.map((stat) => (
            <div key={stat.id} className="mini-stat">
              <span className="mini-stat__value">{stat.value}</span>
              <span className="mini-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  )
}
