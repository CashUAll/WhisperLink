import { ChatProvider } from '../../context/ChatContext'
import { ConversationList, ChatWindow, Sidebar } from '../../components/chat'
import { useConversations, useMessages } from '../../hooks'
import './ChatPage.css'

function ChatPageContent() {
  const {
    brandName,
    brandCaption,
    currentUser,
    sideStats,
    actionButtons,
    conversations,
  } = useConversations()
  const { activeConversation } = useMessages()

  return (
    <main id="chat-page" className="chat-page">
      <div className="chat-shell">
        <Sidebar
          brandName={brandName}
          brandCaption={brandCaption}
          currentUser={currentUser}
          actions={actionButtons}
          sideStats={sideStats}
        />

        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversation.id}
        />

        <ChatWindow currentUser={currentUser} conversation={activeConversation} />
      </div>
    </main>
  )
}

export function ChatPage() {
  return (
    <ChatProvider>
      <ChatPageContent />
    </ChatProvider>
  )
}
