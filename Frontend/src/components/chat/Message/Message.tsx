import type { ChatUser, RoomMessage } from '../../../types'
import { joinClassNames } from '../../../utils'
import './Message.css'

interface MessageProps {
  message: RoomMessage
  author: ChatUser
  isOwn?: boolean
}

export function Message({ message, author, isOwn = false }: MessageProps) {
  return (
    <div className={joinClassNames('msg-row', isOwn && 'msg-row--own')}>
      {!isOwn && (
        <div
          className="msg-avatar"
          style={{ background: author.accent }}
          title={author.name}
        >
          {author.avatarText}
        </div>
      )}
      <div className="msg-bubble-wrap">
        {!isOwn && <span className="msg-author">{author.name}</span>}
        <div className={joinClassNames('msg-bubble', isOwn && 'msg-bubble--own')}>
          <p className="msg-text">{message.text}</p>
          <span className="msg-time">{message.time}</span>
        </div>
      </div>
    </div>
  )
}
