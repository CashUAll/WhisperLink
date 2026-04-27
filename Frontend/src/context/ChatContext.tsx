import type { ReactNode } from 'react'
import { ChatContext, chatContextValue } from './chatContextStore'

interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  return <ChatContext.Provider value={chatContextValue}>{children}</ChatContext.Provider>
}
