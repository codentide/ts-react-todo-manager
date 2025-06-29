import type { SignupData } from '../../types/auth.types'
import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import { Form, LoadingSpinner } from '../common'

export const SignupForm = () => {
  const { signup, setAuthError, clearAuthError } = useAuthActions()
  const error = useAuthError()
  const isLoading = useAuthLoading()

  const handleLogin = async (data: SignupData) => {
    clearAuthError()
    if (data.password !== data.repeatedPassword) {
      setAuthError('Both passwords must be the same')
      return
    }

    signup(data)
  }

  return (
    <>
      <Form className="login" onSubmit={handleLogin}>
        <div className="form-element">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" name="name" />
        </div>

        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>

        <div className="form-element">
          <label htmlFor="password">Repeat password</label>
          <input type="password" id="repeated-password" name="repeatedPassword" />
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? <LoadingSpinner /> : 'Sign Up'}</span>
        </button>
      </Form>
      {error && <span className="error">{error}</span>}
    </>
  )
}
