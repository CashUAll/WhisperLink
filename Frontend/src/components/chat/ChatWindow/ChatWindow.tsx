import type { ActiveConversation, ChatUser } from '../../../types'
import { Avatar, Button } from '../../common'
import { MessageList } from '../MessageList/MessageList'
import './ChatWindow.css'

interface ChatWindowProps {
  currentUser: ChatUser
  conversation: ActiveConversation
}

export function ChatWindow({ currentUser, conversation }: ChatWindowProps) {
  const leadUser = conversation.participants[0]

  return (
    <section id="chat-room" className="chat-window">
      <header className="room-header">
        <div className="room-header__main">
          <Avatar
            name={leadUser?.avatarText ?? 'WL'}
            label={conversation.title}
            accent={leadUser?.accent}
            status={leadUser?.presence}
          />

          <div className="room-header__copy">
            <h2 className="room-header__title">{conversation.title}</h2>
            <p className="room-header__subtitle">{conversation.subtitle}</p>
            <span className="room-header__status">{conversation.statusLabel}</span>
          </div>
        </div>

        <div className="room-header__tools">
          <button type="button" className="room-tool">
            Search
          </button>
          <button type="button" className="room-tool">
            Call
          </button>
          <button type="button" className="room-tool">
            More
          </button>
        </div>
      </header>



      <div className="chat-feed">
        <div className="composer-box">
          <div className="composer-box__main">



            <div id="inputForm">
              <input type="text" id="message" />

              <div className="composer-box__actions">
                <input type="button" id="sendBtn" value="Trimite" />
              </div>
            </div>




          </div>
        </div>
      </div>
    </section>
  )
}
