import type { ChatUser, RoomMessage } from '../../../types'
import { Avatar } from '../../common'
import { joinClassNames } from '../../../utils'
import './Message.css'

interface MessageProps {
  message: RoomMessage
  author: ChatUser
  isOwn?: boolean
}

export function Message({ message, author, isOwn = false }: MessageProps) {
  return (
    <article className={joinClassNames('message-row', isOwn && 'message-row--own')}>
      <Avatar
        name={author.avatarText}
        label={author.name}
        accent={author.accent}
        status={author.presence}
        size="sm"
      />

      <div className={joinClassNames('message-card', isOwn && 'message-card--own')}>
        <div className="message-card__top">
          <div>
            <span className="message-card__name">{isOwn ? 'You' : author.name}</span>
            <span className="message-card__role">{author.role}</span>
          </div>
          <span className="message-card__time">{message.time}</span>
        </div>

        <p className="message-card__text">{message.text}</p>

        {message.badge ? <span className="message-card__badge">{message.badge}</span> : null}
      </div>
    </article>
  )
}
