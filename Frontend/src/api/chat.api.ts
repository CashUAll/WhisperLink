// ─── Chat API ─────────────────────────────────────────────────────────────────
// Conectare cu: /api/conversations, /messages

import { request } from './client'

export interface ConversationDto {
  id: string
  title: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  participantIds: string[]
}

export interface MessageDto {
  id: string
  conversationId: string
  authorId: string
  text: string
  createdAt: string
}

export interface SendMessagePayload {
  conversationId: string
  text: string
}

export const chatApi = {
  getConversations: (token: string) =>
    request<ConversationDto[]>('/Message/conversations', { token }),

  getMessages: (conversationId: string, token: string) =>
    request<MessageDto[]>(`/Message/conversation/${conversationId}`, { token }),

  sendMessage: (data: SendMessagePayload, token: string) =>
    request<MessageDto>('/Message', { method: 'POST', body: data, token }),

  createConversation: (participantIds: string[], token: string) =>
    request<ConversationDto>('/Message/conversations', { method: 'POST', body: { participantIds }, token }),
}
