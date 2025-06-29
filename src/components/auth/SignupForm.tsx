import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import type { SignupData } from '../../types/auth.types'
import { Form } from '../Form'

export const SignupForm = () => {
  const { signup } = useAuthActions()
  const error = useAuthError()
  const isLoading = useAuthLoading()

  const handleLogin = async (data: SignupData) => {
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

        <button disabled={isLoading}>
          <span>{isLoading ? 'Loading...' : 'Continue'}</span>
        </button>
      </Form>
      {error && <span className="error">{error}</span>}
    </>
  )
}
