// ─── Friends API ──────────────────────────────────────────────────────────────
// Conectare cu: /api/friends, /friend-requests

import { request } from './client'

export interface FriendDto {
  id: string
  name: string
  handle: string
  avatarUrl?: string
  status: 'online' | 'away' | 'offline'
}

export interface FriendRequestDto {
  id: string
  fromUserId: string
  toUserId: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export const friendsApi = {
  getFriends: (token: string) =>
    request<FriendDto[]>('/Friend', { token }),

  searchUsers: (query: string, token: string) =>
    request<FriendDto[]>(`/User?search=${encodeURIComponent(query)}`, { token }),

  sendRequest: (toUserId: string, token: string) =>
    request<FriendRequestDto>('/Friend/request', { method: 'POST', body: { toUserId }, token }),

  acceptRequest: (requestId: string, token: string) =>
    request<FriendRequestDto>(`/Friend/${requestId}/accept`, { method: 'PUT', token }),

  rejectRequest: (requestId: string, token: string) =>
    request<FriendRequestDto>(`/Friend/${requestId}/reject`, { method: 'PUT', token }),

  removeFriend: (friendId: string, token: string) =>
    request<void>(`/Friend/${friendId}`, { method: 'DELETE', token }),
}
