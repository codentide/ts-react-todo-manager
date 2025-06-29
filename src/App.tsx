import { Header } from './components'
import { useAuthSync } from './hooks/useAuthSync'

import { AppRoutes } from './components/layout/AppRoutes'
import { useAuthRoutes } from './hooks/useAuthRoutes'

const App = () => {
  useAuthSync()
  useAuthRoutes()

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  )
}

export default App
