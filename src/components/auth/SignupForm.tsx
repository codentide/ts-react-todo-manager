import { useAuthActions, useAuthError } from '../../store/auth.store'
import type { SignupData } from '../../types/auth.types'
import { Form } from '../Form'

export const SignupForm = () => {
  const error = useAuthError()
  const { signup } = useAuthActions()

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

        <button>Continue</button>
      </Form>
      {error && <span className="error">{error}</span>}
    </>
  )
}
