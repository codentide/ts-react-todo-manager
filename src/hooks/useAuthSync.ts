import { useEffect } from 'react'
import { supabase } from '../supabase/client'
import { useAuthActions } from '../store/auth.store'
import { useNavigate } from 'react-router'

export const useAuthSync = () => {
  const { setIsLoading, setUser, setSession, setIsRecovery } = useAuthActions()
  const navigate = useNavigate()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
          setSession(session)
          setUser(session?.user || null)
          setIsLoading(false)
          break
        case 'SIGNED_OUT':
          setSession(null)
          setUser(null)
          setIsLoading(false)
          break
        case 'PASSWORD_RECOVERY':
          setIsRecovery(true)
          navigate('/password-reset')
          break
        default:
          setIsLoading(false)
          break
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [setIsLoading, setSession, setUser, setIsRecovery, navigate])
}
