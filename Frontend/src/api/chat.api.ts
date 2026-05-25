import { request } from './client'
import type { BackendUser } from './auth.api'

export interface MessageDto {
  id: number
  senderId: number
  receiverId: number
  content: string
  status: number
  readAt?: string
  createdAt: string
  sender: BackendUser
  receiver: BackendUser
}

export interface ConversationDto {
  user: BackendUser
  lastMessage: MessageDto
  unreadCount: number
}

export interface SendMessagePayload {
  receiverId: number
  content: string
}

export const chatApi = {
  getConversations: (token: string) =>
    request<ConversationDto[]>('/Message/conversations', { token }),

  getMessages: (otherUserId: number, token: string) =>
    request<MessageDto[]>(`/Message/conversation/${otherUserId}`, { token }),

  sendMessage: (data: SendMessagePayload, token: string) =>
    request<MessageDto>('/Message', { method: 'POST', body: data, token }),

  markAsRead: (messageId: number, token: string) =>
    request<void>(`/Message/${messageId}/read`, { method: 'PUT', token }),
}
