import { supabase } from '../supabase/client'

interface LoginData {
  email: string
  password: string
}

interface AuthResult {
  data: {
    user: object | null
    session: object | null
  } | null
  error: {
    message: string
    details?: string
  } | null
}

//

const signUp = async ({ email, password }: LoginData): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    return { data, error }
  } catch (error: unknown) {
    console.error(error)
    return {
      data: null,
      error: {
        message: 'An unexpected error occurred',
        details:
          (error as { message: string | null }).message ||
          'An unexpected error occurred',
      },
    }
  }
}

//

const signIn = async ({ email, password }: LoginData): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return { data: { user: null, session: null }, error: error }

    return { data: { user: data.user, session: data.session }, error: null }
  } catch (error: unknown) {
    console.error(error)
    return {
      data: null,
      error: {
        message: 'An unexpected error occurred',
        details:
          (error as { message: string | null }).message ||
          'An unexpected error occurred',
      },
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

export { signUp, signIn, signOut }
