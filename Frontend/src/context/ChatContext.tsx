import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { chatService } from '../services'
import type { ChatWorkspaceModel } from '../types'

const chatWorkspace = chatService.getChatWorkspace()

const ChatContext = createContext<ChatWorkspaceModel | null>(null)

interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  return <ChatContext.Provider value={chatWorkspace}>{children}</ChatContext.Provider>
}

export const useChatContext = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider')
  }

  return context
}
