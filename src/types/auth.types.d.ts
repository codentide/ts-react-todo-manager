import type { AuthSession, User } from '@supabase/supabase-js'

export interface LoginData {
  email: string
  password: string
}

export interface SignupData extends LoginData {
  name: string
  passwordRepeat: string
}

export interface AuthError {
  code?: number
  name: string
  message: string
  originalError?: unknown
}

export interface AuthResult {
  data?: {
    user: User
    session: AuthSession
  } | null
  error: AuthError | null
}
