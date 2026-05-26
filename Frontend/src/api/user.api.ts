// ─── User API ─────────────────────────────────────────────────────────────────
// Conectare cu: /api/users/me, /users/:id

import { request } from './client'

export interface UserProfileDto {
  id: string
  name: string
  handle: string
  email: string
  bio?: string
  role?: string
  avatarUrl?: string
  status: 'online' | 'away' | 'offline'
}

export interface UpdateProfilePayload {
  name?: string
  handle?: string
  bio?: string
  role?: string
}

export const userApi = {
  getMe: (token: string) =>
    request<UserProfileDto>('/User/me', { token }),

  getUser: (userId: string, token: string) =>
    request<UserProfileDto>(`/User/${userId}`, { token }),

  updateProfile: (data: UpdateProfilePayload, token: string) =>
    request<UserProfileDto>('/User/me', { method: 'PUT', body: data, token }),

  updateStatus: (status: 'online' | 'away' | 'offline', token: string) =>
    request<void>('/User/me/status', { method: 'PUT', body: { status }, token }),
}
