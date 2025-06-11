import { useContext } from 'react'
import { TodoContext, type TodoContextType } from '../context/todo.context'

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext)

  if (context === null) {
    throw new Error('useTodo debe ser usado dentro de un TodoProvider.')
  }

  return context
}
