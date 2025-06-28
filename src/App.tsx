import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { AuthPage, HomePage } from './pages'
import { useAuthStore } from './store/auth.store'
import { Header } from './components'
import { useAuthSync } from './hooks/useAuthSync'

const App = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const authIsLoading = useAuthStore((state) => state.isLoading)
  useAuthSync()

  useEffect(() => {
    if (authIsLoading) return

    const path = location.pathname

    if (user) {
      if (user && path === '/login') navigate('/')
    } else if (path !== '/login') navigate('/login')
  }, [user, authIsLoading, navigate])

  return (
    <>
      <Header />
      <main className="todo-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
