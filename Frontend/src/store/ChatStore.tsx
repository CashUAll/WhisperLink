import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { ChatWorkspaceModel, ChatUser, ConversationPreview } from '../types'
import { chatApi } from '../api/chat.api'
import type { ConversationDto } from '../api/chat.api'
import type { BackendUser } from '../api/auth.api'
import { mockChatWorkspace } from '../mock/chat.mock'

const ChatContext = createContext<ChatWorkspaceModel | null>(null)

function getToken(): string {
  return localStorage.getItem('token') ?? ''
}

function getStoredUser(): BackendUser | null {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function backendUserToChatUser(u: BackendUser): ChatUser {
  const initials = ((u.firstName?.[0] ?? '') + (u.lastName?.[0] ?? '')) || u.username.slice(0, 2).toUpperCase()
  return {
    id: String(u.id),
    name: u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : u.username,
    handle: `@${u.username}`,
    role: '',
    email: u.email,
    presence: u.isOnline ? 'online' : 'offline',
    avatarText: initials,
    accent: 'linear-gradient(135deg, #8a2be2, #ff007f)',
  }
}

function conversationDtoToPreview(dto: ConversationDto): ConversationPreview {
  const u = dto.user
  const initials = ((u.firstName?.[0] ?? '') + (u.lastName?.[0] ?? '')) || u.username.slice(0, 2).toUpperCase()
  return {
    id: String(u.id),
    section: 'Conversații',
    title: u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : u.username,
    message: dto.lastMessage?.content ?? '',
    time: dto.lastMessage ? new Date(dto.lastMessage.createdAt).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' }) : '',
    tag: '',
    unreadCount: dto.unreadCount,
    avatarText: initials,
    accent: 'linear-gradient(135deg, #8a2be2, #ff007f)',
    presence: u.isOnline ? 'online' : 'offline',
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<ChatWorkspaceModel>(() => {
    const stored = getStoredUser()
    if (!stored) return mockChatWorkspace
    return {
      ...mockChatWorkspace,
      currentUser: backendUserToChatUser(stored),
      conversations: [],
    }
  })

  useEffect(() => {
    const token = getToken()
    if (!token) return

    chatApi.getConversations(token).then(conversations => {
      const previews: ConversationPreview[] = conversations.map(conversationDtoToPreview)
      setWorkspace(prev => ({
        ...prev,
        conversations: previews,
        activeConversation: previews.length > 0
          ? { ...prev.activeConversation, id: previews[0].id, title: previews[0].title, messages: [] }
          : prev.activeConversation,
      }))
    }).catch(() => {})
  }, [])

  return <ChatContext.Provider value={workspace}>{children}</ChatContext.Provider>
}

export function useChatStore(): ChatWorkspaceModel {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatStore trebuie folosit în interiorul <ChatProvider>')
  return ctx
}
