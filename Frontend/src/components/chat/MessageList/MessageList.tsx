import type { ChatUser, RoomMessage } from '../../../types'
import { Message } from '../Message/Message'
import './MessageList.css'

interface MessageListProps {
  messages: RoomMessage[]
  participants: ChatUser[]
  currentUserId: string
}

export function MessageList({
  messages,
  participants,
  currentUserId,
}: MessageListProps) {
  return (
    <div className="message-stream">
      {messages.map((message) => {
        const author = participants.find((item) => item.id === message.authorId)

        if (!author) {
          return null
        }

        return (
          <Message
            key={message.id}
            message={message}
            author={author}
            isOwn={message.authorId === currentUserId}
          />
        )
      })}
    </div>
  )
}
