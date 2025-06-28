import type { LoginData } from '../../types'
import { signIn } from '../../services'
import { Form } from '../Form'

export const LoginForm = () => {
  const handleLogin = async (data: object) => {
    signIn(data as LoginData)
  }

  return (
    <Form className="login" onSubmit={handleLogin}>
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
  )
}
