import type { AuthSession, User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface State {
  user: User | null
  session: AuthSession | null
  isLoading: boolean
}

interface Actions {
  setUser: (user: User | null) => void
  setSession: (session: AuthSession | null) => void
  setIsLoading: (value: boolean) => void
}

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setIsLoading: (value) => set({ isLoading: value }),
}))
