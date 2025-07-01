import type { SignupData } from '../../types/auth.types'
import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import { Form, InputPassword, LoadingSpinner } from '../common'
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
      <div className="form-container__heading">
        <h3>Join Us</h3>
        <p>Start getting things done.</p>
      </div>

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
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <InputPassword id="password" />
        </div>

        <div className="form-element">
          <label htmlFor="password">Repeat password</label>
          <InputPassword id="passwordRepeat" />
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? <LoadingSpinner /> : 'Get Started'}</span>
        </button>
      </Form>
      {error && <span className="error">{error}</span>}
    </>
  )
}
