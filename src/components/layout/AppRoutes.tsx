import { Route, Routes } from 'react-router'
import { AuthPage, HomePage } from '../../pages'
import { LoginForm, SignupForm } from '../auth'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AuthPage />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Route>
    </Routes>
  )
}
