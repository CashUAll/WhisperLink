import { useState, useEffect } from 'react'
import { LandingPage } from './pages/Landing/LandingPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ChatPage } from './pages/chat/ChatPage'

type AppPage = 'landing' | 'login' | 'register' | 'chat'

function App() {
  const [page, setPage] = useState<AppPage>('landing')

  useEffect(() => {
    document.body.style.overflow = page === 'chat' ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = '' }
  }, [page])

  if (page === 'chat') return <ChatPage onBack={() => setPage('landing')} />
  if (page === 'login') return <LoginPage onLogin={() => setPage('chat')} onGoRegister={() => setPage('register')} onBack={() => setPage('landing')} />
  if (page === 'register') return <RegisterPage onRegister={() => setPage('chat')} onGoLogin={() => setPage('login')} onBack={() => setPage('landing')} />

  return <LandingPage onEnter={() => setPage('login')} />
}

export default App
