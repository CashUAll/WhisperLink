import { useState, useEffect } from 'react'
import { LandingPage } from './pages/Landing/LandingPage'
import { ChatPage } from './pages/ChatDashboard/ChatPage'

type AppPage = 'landing' | 'chat'

function App() {
  const [page, setPage] = useState<AppPage>('landing')

  useEffect(() => {
    document.body.style.overflow = page === 'chat' ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = '' }
  }, [page])

  return page === 'chat'
    ? <ChatPage onBack={() => setPage('landing')} />
    : <LandingPage onEnter={() => setPage('chat')} />
}

export default App
