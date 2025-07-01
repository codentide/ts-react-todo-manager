import { supabase } from '../supabase/client'
import type { AuthResult, AuthError, LoginData, SignupData } from '../types'

// SIGNUP

const signup = async ({ email, password, name }: SignupData): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      throw {
        code: error.status || null,
        name: error.code,
        message: error.message || 'Unexpected auth error',
        originalError: error,
      } as AuthError
    }

    // [ ]: Ojo con esta aserción
    return { data: data as AuthResult['data'], error: null }
  } catch (error) {
    console.error('Signup Error: ', error)
    return {
      data: null,
      error: error as AuthError,
    }
  }
}

// LOGIN

const login = async (loginData: LoginData): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(loginData)

    if (error) {
      throw {
        code: error.status || null,
        name: error.code,
        message: error.message || 'Unexpected auth error',
        originalError: error,
      } as AuthError
    }

    return { data, error: null }
  } catch (error) {
    console.error('Login Error:', error)
    return {
      data: null,
      error: error as AuthError,
    }
  }
}

// LOGOUT / SIGNOUT

const signout = async (): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw {
        code: error.status || null,
        name: error.code,
        message: error.message || 'Unexpected auth error',
        originalError: error,
      } as AuthError
    }

    return { error: null }
  } catch (error) {
    console.error('Signout Error:', error)
    return {
      error: error as AuthError,
    }
  }
}

// REQUEST PASSWORD RECOVERY

const requestPasswordReset = async (email: string): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      throw {
        code: error.status || null,
        name: error.code,
        message: error.message || 'Unexpected auth error',
        originalError: error,
      } as AuthError
    }

    return { error: null }
  } catch (error) {
    console.error('Signout Error:', error)
    return {
      error: error as AuthError,
    }
  }
}

// UPDATE USER PASSWORD

const resetPassword = async (newPassword: string): Promise<AuthResult> => {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  try {
    if (error) {
      throw {
        code: error.status || null,
        name: error.code,
        message: error.message || 'Unexpected auth error',
        originalError: error,
      } as AuthError
    }

    return { error: null }
  } catch (error) {
    console.error('Signout Error:', error)
    return {
      error: error as AuthError,
    }
  }
}

export { signup, login, signout, requestPasswordReset, resetPassword }
