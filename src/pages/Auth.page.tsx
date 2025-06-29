import { NavLink, Outlet, useLocation } from 'react-router'
import { useAuthActions } from '../store/auth.store'
import { useEffect } from 'react'

export const AuthPage = () => {
  const location = useLocation()
  const { clearAuthError } = useAuthActions()

  useEffect(() => clearAuthError, [location.pathname, clearAuthError])

  return (
    <section className="auth-page">
      <h3>Hello! Let's get you in</h3>

      <div className="auth-page__nav">
        <NavLink to={'/Login'} children="Login" />
        <NavLink to={'/signup'} children="Signup" />
      </div>

      <Outlet />
    </section>
  )
}
