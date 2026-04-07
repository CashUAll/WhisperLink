import type { ConversationPreview } from '../../../types'
import { Avatar } from '../../common'
import { formatUnreadCount, getPresenceLabel, joinClassNames } from '../../../utils'
import './ConversationItem.css'

interface ConversationItemProps {
  conversation: ConversationPreview
  isActive?: boolean
}

export function ConversationItem({
  conversation,
  isActive = false,
}: ConversationItemProps) {
  return (
    <article
      className={joinClassNames('conversation-item', isActive && 'conversation-item--active')}
    >
      <Avatar
        name={conversation.avatarText}
        label={conversation.title}
        accent={conversation.accent}
        status={conversation.presence}
      />

      <div className="conversation-item__body">
        <div className="conversation-item__top">
          <h3 className="conversation-item__title">{conversation.title}</h3>
          <span className="conversation-item__time">{conversation.time}</span>
        </div>

        <p className="conversation-item__message">{conversation.message}</p>

        <div className="conversation-item__bottom">
          <span className="conversation-item__tag">{conversation.tag}</span>
          <span className="conversation-item__status">
            {getPresenceLabel(conversation.presence)}
          </span>
        </div>
      </div>

      <div className="conversation-item__meta">
        {conversation.pinned ? <span className="conversation-item__pin">Pinned</span> : null}
        {conversation.unreadCount > 0 ? (
          <span className="conversation-item__badge">
            {formatUnreadCount(conversation.unreadCount)}
          </span>
        ) : null}
      </div>
    </article>
  )
}
