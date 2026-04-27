// ─── API Layer ────────────────────────────────────────────────────────────────
// Toate apelurile HTTP către backend sunt organizate aici.
// Fiecare fișier corespunde unui domeniu (auth, chat, friends, user).

export { authApi }    from './auth.api'
export { chatApi }    from './chat.api'
export { friendsApi } from './friends.api'
export { userApi }    from './user.api'
export { request }    from './client'
