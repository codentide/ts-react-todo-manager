import type { SignupData } from '../../types/auth.types'
import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import { Form, LoadingSpinner } from '../common'
import { NavLink } from 'react-router'

export const SignupForm = () => {
  const { signup, setAuthError, clearAuthError } = useAuthActions()
  const error = useAuthError()
  const isLoading = useAuthLoading()

  const handleLogin = async (data: SignupData) => {
    clearAuthError()
    if (data.password !== data.passwordRepeat) {
      setAuthError('Both passwords must be the same')
      return
    }

    signup(data)
  }

  return (
    <>
      <h3 className="form-container__title">Empieza tu camino</h3>
      <div className="form-container__switch">
        <NavLink to={'/Login'} children="Login" />
        <NavLink to={'/signup'} children="Signup" />
      </div>

      <Form className="login" onSubmit={handleLogin}>
        <div className="form-element">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-element">
          <label htmlFor="password">Repeat password</label>
          <input type="password" id="password-repeat" name="passwordRepeat" required />
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? <LoadingSpinner /> : 'Sign Up'}</span>
        </button>
      </Form>
      {error && <span className="error">{error}</span>}
    </>
  )
}
