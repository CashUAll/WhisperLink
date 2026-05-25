import { request } from './client'

export interface LoginPayload {
  usernameOrEmail: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface BackendUser {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  profilePictureUrl?: string
  isOnline: boolean
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: BackendUser
}

export const authApi = {
  login: (data: LoginPayload) =>
    request<AuthResponse>('/Auth/login', { method: 'POST', body: data }),

  register: (data: RegisterPayload) =>
    request<AuthResponse>('/Auth/register', { method: 'POST', body: data }),

  logout: (token: string) =>
    request<void>('/Auth/logout', { method: 'POST', token }),

  refreshToken: (refreshToken: string) =>
    request<{ token: string }>('/Auth/refresh-token', { method: 'POST', body: { refreshToken } }),
}
