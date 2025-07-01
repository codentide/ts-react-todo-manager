import { Link } from 'react-router'
import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import { Form, LoadingSpinner } from '../common'
import { useState } from 'react'

export const RequestPasswordResetForm = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false)
  const error = useAuthError()
  const isLoading = useAuthLoading()
  const { requestPasswordReset } = useAuthActions()

  const handleSubmit = async ({ email }: { email: string }) => {
    const success = await requestPasswordReset(email)
    setIsSuccessful(success)
  }

  // [ ]: Hace falta feedback visual de que la operación fue exitosa

  return (
    <>
      <div className="form-container__heading">
        <h3>Regain access</h3>
        <p>We'll send a link to reset your password</p>
      </div>

      <Form className="forgot-password" onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <Link className="forgot-password-link" to={'/login'}>
            Back to Login
          </Link>
        </div>

        {isSuccessful ? (
          <button className="successful" disabled={true}>
            <span>{isLoading ? <LoadingSpinner /> : 'Email sent'}</span>
          </button>
        ) : (
          <button disabled={isLoading}>
            <span>{isLoading ? <LoadingSpinner /> : 'Submit'}</span>
          </button>
        )}
      </Form>

      {error && <span className="error">{error}</span>}
    </>
  )
}
