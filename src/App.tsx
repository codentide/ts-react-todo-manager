import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { AuthPage, HomePage } from './pages'
import { useAuthStore } from './store/auth.store'
import { Header } from './components'
import { useAuthSync } from './hooks/useAuthSync'

const App = () => {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const navigate = useNavigate()

  // Escucha y actualiza authStore
  useAuthSync()

  useEffect(() => {
    if (isLoading) return

    const path = location.pathname

    if (user) {
      if (user && path === '/login') navigate('/')
    } else if (path !== '/login') navigate('/login')
  }, [user, isLoading, navigate])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
      <footer></footer>
    </>
  )
}

export default App
