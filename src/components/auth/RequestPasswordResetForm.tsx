import { useAuthActions, useAuthError, useAuthLoading } from '../../store/auth.store'
import { Form, LoadingSpinner } from '../common'

export const RequestPasswordResetForm = () => {
  const error = useAuthError()
  const isLoading = useAuthLoading()
  const { requestPasswordReset } = useAuthActions()

  const handleSubmit = async ({ email }: { email: string }) => {
    requestPasswordReset(email)
  }

  return (
    <>
      <h3 className="form-container__title">Recupera tu contraseña</h3>
      <p className="form-container__description">
        Coloca tu correo y te enviaremos un enlace para cambiar tu contraseña
      </p>

      <Form className="forgot-password" onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? <LoadingSpinner /> : 'Submit'}</span>
        </button>
      </Form>

      {error && <span className="error">{error}</span>}
    </>
  )
}
