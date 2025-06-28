import { useEffect } from 'react'

import { useAuthStore } from '../store/auth.store'
import { supabase } from '../supabase/client'

export const useAuthSync = () => {
  const { setIsLoading, setUser, setSession } = useAuthStore()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event)
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
        default:
          setIsLoading(false)
          break
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [setIsLoading, setSession, setUser])
}
