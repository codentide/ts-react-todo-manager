import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoProvider } from './context/todo.provider.tsx'

import './scss/main.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>
)
