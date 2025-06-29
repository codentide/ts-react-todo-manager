import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Header } from './components'
import { useAuthSync } from './hooks/useAuthSync'
import { useAuthUser, useAuthLoading } from './store/auth.store'
import { AppRoutes } from './components/AppRoutes'

const App = () => {
  const navigate = useNavigate()
  const user = useAuthUser()
  const authIsLoading = useAuthLoading()
  useAuthSync()

  useEffect(() => {
    if (authIsLoading) return

    const path = location.pathname

    if (user) {
      if (path === '/login') navigate('/')
      else if (path === '/signup') navigate('/')
    } else {
      if (path !== '/login' && path !== '/signup') navigate('/login')
    }
  }, [user, authIsLoading, navigate])

  return (
    <>
      <Header />
      <main className="todo-container">
        <AppRoutes />
      </main>
      <footer></footer>
    </>
  )
}

export default App
