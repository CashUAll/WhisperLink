// ─── Chat Store ───────────────────────────────────────────────────────────────
// Starea globală a aplicației de chat.
//
// Acum: folosește date mock din mock/chat.mock.ts
// Când conectezi backend-ul: înlocuiește `mockChatWorkspace` cu un apel din api/
//
// Exemplu după conectare:
//   const data = await chatApi.getConversations(token)
//   setValue(data)

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { ChatWorkspaceModel } from '../types'
import { mockChatWorkspace } from '../mock/chat.mock'

// ── Context ──────────────────────────────────────────────────────────────────

const ChatContext = createContext<ChatWorkspaceModel | null>(null)

// ── Provider ─────────────────────────────────────────────────────────────────

export function ChatProvider({ children }: { children: ReactNode }) {
  // TODO: înlocuiește cu fetch real când backend-ul este gata
  const value = mockChatWorkspace

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useChatStore(): ChatWorkspaceModel {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatStore trebuie folosit în interiorul <ChatProvider>')
  return ctx
}
