import type { ConversationPreview } from '../../../types'
import { Input } from '../../common'
import { groupConversations } from '../../../utils'
import { ConversationItem } from '../ConversationItem/ConversationItem'
import './ConversationList.css'

interface ConversationListProps {
  conversations: ConversationPreview[]
  activeConversationId: string
}

export function ConversationList({
  conversations,
  activeConversationId,
}: ConversationListProps) {
  const groupedConversations = groupConversations(conversations)

  return (
    <section id="conversation-panel" className="conversation-panel">
      <div className="list-top">
        <div>
          <h2 className="list-top__title">Conversations</h2>
        </div>
        <span className="list-top__count">{conversations.length}</span>
      </div>

      <Input
        type='text'
        prefixLabel="Search"
        placeholder="Search user, chat or group"
      />

      <div className="group-list">
        {Object.entries(groupedConversations).map(([section, items]) => (
          <section key={section} className="list-group">
            <div className="list-group__head">
              <p className="section-label">{section}</p>
              <span className="list-group__count">{items.length}</span>
            </div>

            <div className="list-group__body">
              {items.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={conversation.id === activeConversationId}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
