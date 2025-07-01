import { Route, Routes } from 'react-router'
import { AuthPage, HomePage } from '../../pages'
import { LoginForm, PasswordResetForm, RequestPasswordResetForm, SignupForm } from '../auth'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AuthPage />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<RequestPasswordResetForm />} />
        <Route path="/password-reset" element={<PasswordResetForm />} />
      </Route>
    </Routes>
  )
}
