import { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'
import { useAuthStore } from '../store/auth.store'

export const AuthPage = () => {
  const authIsLoading = useAuthStore((state) => state.isLoading)
  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <section className="auth-page">
      <h3>Hello! Let's get you in</h3>

      <div className="auth-page__switch">
        <span className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
          Login
        </span>
        <span className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
          Signup
        </span>
      </div>

      {/* Aca abajo usar el router para cambiar entre login y signup */}

      {authIsLoading ? 'CARGANDO' : isLogin ? <LoginForm /> : 'singup'}
    </section>
  )
}
