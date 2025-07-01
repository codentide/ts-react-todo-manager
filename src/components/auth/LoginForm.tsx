import type { LoginData } from '../../types/auth.types'
import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import { Form, InputPassword, LoadingSpinner } from '../common'
import { Link, NavLink } from 'react-router'

export const LoginForm = () => {
  const { login } = useAuthActions()
  const error = useAuthError()
  const isLoading = useAuthLoading()

  const handleLogin = async (data: LoginData) => {
    login(data)
  }

  return (
    <>
      <div className="form-container__heading">
        <h3>Welcome</h3>
        <p>Get your tasks done.</p>
      </div>

      <div className="form-container__switch">
        <NavLink to={'/Login'} children="Login" />
        <NavLink to={'/signup'} children="Signup" />
      </div>

      <Form className="login" onSubmit={handleLogin}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <InputPassword id="password" />
          <Link className="forgot-password-link" to={'/forgot-password'}>
            Forgot password?
          </Link>
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? <LoadingSpinner /> : 'Enter'}</span>
        </button>
      </Form>

      {error && <span className="error">{error}</span>}
    </>
  )
}
