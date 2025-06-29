import { NavLink, Outlet, useLocation } from 'react-router'
import { useAuthActions } from '../store/auth.store'
import { useEffect } from 'react'

export const AuthPage = () => {
  const location = useLocation()
  const { clearAuthError } = useAuthActions()

  useEffect(() => clearAuthError, [location.pathname, clearAuthError])

  return (
    <section className="auth-page">
      <div className="form-container">
        <h3 className="form-container__title">Hello! Let's get you in</h3>
        <div className="form-container__switch">
          <NavLink to={'/Login'} children="Login" />
          <NavLink to={'/signup'} children="Signup" />
        </div>
        <Outlet />
      </div>
    </section>
  )
}
