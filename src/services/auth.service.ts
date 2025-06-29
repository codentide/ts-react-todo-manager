import { supabase } from '../supabase/client'
import type { AuthResult, AuthError, LoginData, SignupData } from '../types'

//

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
  } catch (error: unknown) {
    console.error('Signup Error: ', error)
    return {
      data: null,
      error: error as AuthError,
    }
  }
}

//

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
  } catch (error: unknown) {
    console.error('Login Error:', error)
    return {
      data: null,
      error: error as AuthError,
    }
  }
}

//

const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('[LOGOUT] ', error)
    return { error }
  }

  return { error: null }
}

export { signup, login, signOut }
