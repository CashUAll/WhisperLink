// ─── Admin API ────────────────────────────────────────────────────────────────
// Endpoints pentru Admin dashboard

import { request } from './client'

export interface AdminStats {
  totalUsers: number
  onlineUsers: number
  totalMessages: number
  totalFriendships: number
  timestamp: string
}

export interface AdminUserDto {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  role: string
  isOnline: boolean
  createdAt: string
}

export const adminApi = {
  // Statistici publice
  getStats: () =>
    request<AdminStats>('/Auth/stats'),

  // Lista tuturor userilor (doar Admin)
  getAllUsers: (token: string) =>
    request<AdminUserDto[]>('/User', { token }),

  // Editează orice user (doar Admin)
  updateUser: (userId: number, data: any, token: string) =>
    request<AdminUserDto>(`/User/${userId}`, { method: 'PUT', body: data, token }),

  // Șterge orice user (doar Admin)
  deleteUser: (userId: number, token: string) =>
    request<void>(`/User/${userId}`, { method: 'DELETE', token }),
}