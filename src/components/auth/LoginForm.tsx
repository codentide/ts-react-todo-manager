import type { LoginData } from '../../types/auth.types'
import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import { Form } from '../Form'

export const LoginForm = () => {
  const { login } = useAuthActions()
  const error = useAuthError()
  const isLoading = useAuthLoading()

  const handleLogin = async (data: LoginData) => {
    login(data)
  }

  return (
    <>
      <Form className="login" onSubmit={handleLogin}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? 'Loading...' : 'Continue'}</span>
        </button>
      </Form>

      {error && <span className="error">{error}</span>}
    </>
  )
}
