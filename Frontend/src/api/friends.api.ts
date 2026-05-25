import { request } from './client'
import type { BackendUser } from './auth.api'

export interface FriendshipDto {
  id: number
  requesterId: number
  addresseeId: number
  status: number
  createdAt: string
  updatedAt?: string
  requester: BackendUser
  addressee: BackendUser
}

export const friendsApi = {
  getFriends: (token: string) =>
    request<FriendshipDto[]>('/Friend', { token }),

  getPendingRequests: (token: string) =>
    request<FriendshipDto[]>('/Friend/pending', { token }),

  searchUsers: (query: string, token: string) =>
    request<BackendUser[]>(`/User?search=${encodeURIComponent(query)}`, { token }),

  sendRequest: (addresseeId: number, token: string) =>
    request<FriendshipDto>('/Friend/request', { method: 'POST', body: { addresseeId }, token }),

  acceptRequest: (id: number, token: string) =>
    request<FriendshipDto>(`/Friend/${id}/accept`, { method: 'PUT', token }),

  rejectRequest: (id: number, token: string) =>
    request<void>(`/Friend/${id}/reject`, { method: 'PUT', token }),
}
