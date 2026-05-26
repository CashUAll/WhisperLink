// ─── Auth API ─────────────────────────────────────────────────────────────────
// Conectare cu: POST /api/auth/login, /register, /logout, /refresh

import { request } from './client'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    handle: string
    avatarUrl?: string
  }
}

export const authApi = {
  login: (data: LoginPayload) =>
    request<AuthResponse>('/Auth/login', { method: 'POST', body: data }),

  register: (data: RegisterPayload) =>
    request<AuthResponse>('/Auth/register', { method: 'POST', body: data }),

  logout: (token: string) =>
    request<void>('/Auth/logout', { method: 'POST', token }),

  refreshToken: (token: string) =>
    request<{ token: string }>('/Auth/refresh-token', { method: 'POST', token }),
}
