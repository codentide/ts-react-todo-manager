import type { SignupData } from '../../types'
import { useNavigate } from 'react-router'
import { useAuthActions, useAuthError, useIsRecovery, useAuthLoading } from '../../store/auth.store'
import { Form, LoadingSpinner } from '../common'
import { useEffect } from 'react'

export const PasswordResetForm = () => {
  const navigate = useNavigate()
  const error = useAuthError()
  const isRecoveryFlow = useIsRecovery()
  const isLoading = useAuthLoading()
  const { updatePassword, clearAuthError, setAuthError, setIsRecovery, signout } = useAuthActions()

  const handleSubmit = async ({ password, passwordRepeat }: Pick<SignupData, 'password' | 'passwordRepeat'>) => {
    clearAuthError()
    if (password !== passwordRepeat) {
      setAuthError('Both passwords must be the same')
      return
    }
    const success = await updatePassword(password)

    if (success) {
      setIsRecovery(false)
      signout()
    }
  }

  // Validar si hay un flujo de recuperación activo, de no ser asi redireccionar
  useEffect(() => {
    if (!isRecoveryFlow) {
      navigate('/login')
    }
  }, [navigate, isRecoveryFlow])

  return (
    <>
      <h3 className="form-container__title">Cambio de contraseña</h3>
      <p className="form-container__description">Coloca tu nueva contraseña</p>

      <Form className="update-password" onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-element">
          <label htmlFor="password">Repeat password</label>
          <input type="password" id="repeated-password" name="passwordRepeat" required />
        </div>

        <button disabled={isLoading}>
          <span>{isLoading ? <LoadingSpinner /> : 'Submit'}</span>
        </button>
      </Form>

      {error && <span className="error">{error}</span>}
    </>
  )
}
