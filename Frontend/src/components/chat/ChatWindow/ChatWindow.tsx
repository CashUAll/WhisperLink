import { useState } from 'react'
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
  const [draft, setDraft] = useState('')

  const handleSend = () => {
    if (!draft.trim()) {
      return
    }

    setDraft('')
  }

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

      <div className="room-banner">
        <span className="room-banner__text">{conversation.topic}</span>
        <span className="room-banner__topic">
          {conversation.participantCount} active collaborators
        </span>
      </div>

      <div className="chat-feed">
        <div className="chat-feed__top">
          <div className="participant-row" aria-label="Conversation participants">
            {conversation.participants.map((participant) => (
              <Avatar
                key={participant.id}
                name={participant.avatarText}
                label={participant.name}
                accent={participant.accent}
                status={participant.presence}
                size="sm"
              />
            ))}
          </div>

          <div className="highlight-row" aria-label="Conversation highlights">
            {conversation.highlights.map((highlight) => (
              <span key={highlight} className="highlight-row__item">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <MessageList
          messages={conversation.messages}
          participants={conversation.participants}
          currentUserId={currentUser.id}
        />

        <div className="composer-box">
          <div className="composer-box__extra" aria-label="Conversation resources">
            {conversation.files.slice(0, 2).map((file) => (
              <span key={file.id} className="composer-box__pill">
                {file.name}
              </span>
            ))}

            {conversation.insights.slice(0, 1).map((insight) => (
              <span key={insight.id} className="composer-box__pill">
                {insight.title}: {insight.value}
              </span>
            ))}
          </div>

          <div className="composer-box__main">
            <textarea
              className="composer-box__field"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={conversation.composerHint}
            />

            <div className="composer-box__actions">
              <div className="composer-box__tools">
                <Button variant="ghost">Attach file</Button>
                <Button variant="ghost">Schedule</Button>
              </div>

              <Button variant="primary" onClick={handleSend} disabled={!draft.trim()}>
                Send message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
