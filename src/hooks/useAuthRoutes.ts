import { useEffect } from 'react'
import { useAuthLoading, useAuthUser } from '../store'
import { useNavigate } from 'react-router'

export const useAuthRoutes = () => {
  const navigate = useNavigate()
  const user = useAuthUser()
  const authIsLoading = useAuthLoading()

  useEffect(() => {
    if (authIsLoading) return

    const path = location.pathname

    if (user) {
      if (path === '/login' || path === '/signup') navigate('/')
    } else {
      if (path !== '/login' && path !== '/signup') navigate('/login')
    }
  }, [user, authIsLoading, navigate])
}
