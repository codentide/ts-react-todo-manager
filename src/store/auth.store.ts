import type { AuthSession, User } from '@supabase/supabase-js'
import type { LoginData, SignupData } from '../types'
import { create } from 'zustand'
import { login, signup } from '../services'

interface Actions {
  setUser: (user: User | null) => void
  setSession: (session: AuthSession | null) => void
  setIsLoading: (value: boolean) => void
  clearAuthError: () => void
  //
  login: (loginData: LoginData) => Promise<void>
  signup: (signupData: SignupData) => Promise<void>
}

interface State {
  user: User | null
  session: AuthSession | null
  isLoading: boolean
  error: string | null
  actions: Actions
}

const useAuthStore = create<State>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  actions: {
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    setIsLoading: (value) => set({ isLoading: value }),
    // Auth Servicess
    login: async (loginData) => {
      set({ error: null })

      const { error } = await login(loginData)
      if (error) set({ error: error.message })
    },
    signup: async (signupData: SignupData) => {
      set({ error: null })

      const { error } = await signup(signupData)
      if (error) set({ error: error.message })
    },
    clearAuthError: () => set({ error: null }),
  },
}))

export const useUser = () => useAuthStore((state) => state.user)
export const useUserLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)

export const useAuthActions = () => useAuthStore((state) => state.actions)
