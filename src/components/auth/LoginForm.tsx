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
      <h3 className="form-container__title">Hola de nuevo, a taskear como loco!</h3>
      <div className="form-container__switch">
        <NavLink to={'/Login'} children="Login" />
        <NavLink to={'/signup'} children="Signup" />
      </div>

      <Form className="login" onSubmit={handleLogin}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          {/* <input type="password" id="password" name="password" /> */}
          <InputPassword id="password" />
          <Link to={'/forgot-password'} children="Forgot password?" />
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? <LoadingSpinner /> : 'Log In'}</span>
        </button>
      </Form>

      {error && <span className="error">{error}</span>}
    </>
  )
}
