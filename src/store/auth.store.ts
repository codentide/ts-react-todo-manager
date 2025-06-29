import type { AuthSession, User } from '@supabase/supabase-js'
import type { LoginData, SignupData } from '../types'
import { create } from 'zustand'
import { login, signout, signup } from '../services'

interface Actions {
  setUser: (user: User | null) => void
  setSession: (session: AuthSession | null) => void
  setIsLoading: (value: boolean) => void
  setAuthError: (value: string) => void
  clearAuthError: () => void
  //
  login: (loginData: LoginData) => Promise<void>
  signup: (signupData: SignupData) => Promise<void>
  signout: () => Promise<void>
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
    setAuthError: (value) => set({ error: value }),
    // Auth Services
    login: async (loginData) => {
      set({ error: null, isLoading: true })

      const { error } = await login(loginData)
      if (error) set({ error: error.message })
      set({ isLoading: false })
    },
    signup: async (signupData: SignupData) => {
      set({ error: null, isLoading: true })

      const { error } = await signup(signupData)
      if (error) set({ error: error.message })
      set({ isLoading: false })
    },
    signout: async () => {
      set({ error: null, isLoading: true })

      const { error } = await signout()

      if (error) set({ error: error.message })
      set({ isLoading: false })
    },
    clearAuthError: () => set({ error: null }),
  },
}))

export const useAuthUser = () => useAuthStore((state) => state.user)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)

export const useAuthActions = () => useAuthStore((state) => state.actions)
