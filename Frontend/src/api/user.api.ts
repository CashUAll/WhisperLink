import { request } from './client'
import type { BackendUser } from './auth.api'

export interface UpdateUserPayload {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
}

export const userApi = {
  getUser: (userId: number, token: string) =>
    request<BackendUser>(`/User/${userId}`, { token }),

  getAllUsers: (token: string, search?: string) =>
    request<BackendUser[]>(`/User${search ? `?search=${encodeURIComponent(search)}` : ''}`, { token }),

  updateUser: (userId: number, data: UpdateUserPayload, token: string) =>
    request<BackendUser>(`/User/${userId}`, { method: 'PUT', body: data, token }),
}
