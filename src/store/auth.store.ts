import type { AuthSession, User } from '@supabase/supabase-js'
import type { LoginData, SignupData } from '../types'
import { login, requestPasswordReset, resetPassword, signout, signup } from '../services'
import { create } from 'zustand'

interface Actions {
  setUser: (user: User | null) => void
  setSession: (session: AuthSession | null) => void
  setIsLoading: (value: boolean) => void
  setAuthError: (value: string) => void
  setIsRecovery: (value: boolean) => void
  clearAuthError: () => void
  //
  login: (loginData: LoginData) => Promise<void>
  signup: (signupData: SignupData) => Promise<void>
  signout: () => Promise<void>
  requestPasswordReset: (email: string) => Promise<boolean>
  updatePassword: (password: string) => Promise<boolean>
}

interface State {
  user: User | null
  session: AuthSession | null
  isLoading: boolean
  error: string | null
  // identifica el flujo de recuperacion de contraseña
  isRecovery: boolean
  actions: Actions
}

const useAuthStore = create<State>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isRecovery: false,
  actions: {
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    setIsLoading: (value) => set({ isLoading: value }),
    setAuthError: (value) => set({ error: value }),
    setIsRecovery: (value) => set({ isRecovery: value }),
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
    requestPasswordReset: async (email: string) => {
      set({ error: null, isLoading: true })
      const { error } = await requestPasswordReset(email)

      if (error) {
        set({ error: error.message, isLoading: false })
        return false
      }

      set({ isLoading: false })
      return true
    },
    updatePassword: async (password: string): Promise<boolean> => {
      set({ error: null, isLoading: true })
      const { error } = await resetPassword(password)
      if (error) {
        set({ error: error.message, isLoading: false })
        return false
      }

      set({ isLoading: false })
      return true
    },
  },
}))

export const useIsRecovery = () => useAuthStore((state) => state.isRecovery)
export const useAuthUser = () => useAuthStore((state) => state.user)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)
export const useAuthActions = () => useAuthStore((state) => state.actions)
