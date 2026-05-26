import { useState, useEffect } from 'react'
import { LandingPage } from './pages/Landing/LandingPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ChatPage } from './pages/chat/ChatPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'

type AppPage = 'landing' | 'login' | 'register' | 'chat' | 'admin'

function App() {
  const [page, setPage] = useState<AppPage>('landing')

  useEffect(() => {
    document.body.style.overflow = page === 'chat' || page === 'admin' ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = '' }
  }, [page])

  // Admin Dashboard
  if (page === 'admin') return <AdminDashboard />

  // Chat Page
  if (page === 'chat') return <ChatPage onBack={() => setPage('landing')} />

  // Register Page
  if (page === 'register') return (
    <RegisterPage 
      onRegister={() => setPage('chat')} 
      onGoLogin={() => setPage('login')} 
      onBack={() => setPage('landing')} 
    />
  )

  // Login Page
  if (page === 'login') return (
    <LoginPage 
      onLogin={() => setPage('chat')} 
      onGoRegister={() => setPage('register')} 
      onBack={() => setPage('landing')} 
    />
  )

  // Landing Page (default)
  return <LandingPage onEnter={() => setPage('login')} />
}

export default App