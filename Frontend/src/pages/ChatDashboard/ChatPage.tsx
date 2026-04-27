import { useState } from 'react'
import type { ViewId } from '../../types'
import { ChatProvider } from '../../context/ChatContext'
import { ConversationList, ChatWindow, Sidebar } from '../../components/chat'
import { useConversations, useMessages } from '../../hooks'
import { NewChatView }       from './views/NewChatView'
import { SearchUserView }    from './views/SearchUserView'
import { NotificationsView } from './views/NotificationsView'
import { SettingsView }      from './views/SettingsView'
import './ChatPage.css'

interface ChatPageProps {
  onBack: () => void
}

function ChatPageContent({ onBack }: ChatPageProps) {
  const [currentView, setCurrentView] = useState<ViewId>('chat')

  const { brandName, currentUser, conversations } = useConversations()
  const { activeConversation } = useMessages()

  return (
    <main className="chat-page">
      <div className={`chat-shell ${currentView !== 'chat' ? 'chat-shell--single' : ''}`}>
        <Sidebar
          brandName={brandName}
          currentUser={currentUser}
          currentView={currentView}
          onViewChange={setCurrentView}
          onBack={onBack}
        />

        {currentView === 'chat' && (
          <>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversation.id}
            />
            <ChatWindow currentUser={currentUser} conversation={activeConversation} />
          </>
        )}

        {currentView === 'new-chat'      && <NewChatView />}
        {currentView === 'search'        && <SearchUserView />}
        {currentView === 'notifications' && <NotificationsView />}
        {currentView === 'settings'      && <SettingsView />}
      </div>
    </main>
  )
}

export function ChatPage({ onBack }: ChatPageProps) {
  return (
    <ChatProvider>
      <ChatPageContent onBack={onBack} />
    </ChatProvider>
  )
}
