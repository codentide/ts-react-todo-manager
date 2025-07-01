import { Outlet, useLocation } from 'react-router'
import { useAuthActions } from '../store/auth.store'
import { useEffect } from 'react'

export const AuthPage = () => {
  const location = useLocation()
  const { clearAuthError } = useAuthActions()

  useEffect(() => clearAuthError, [location.pathname, clearAuthError])

  return (
    <section className="auth-page">
      <div className="form-container">
        <Outlet />
      </div>
    </section>
  )
}
