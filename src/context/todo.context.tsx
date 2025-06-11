import { createContext } from 'react'
import type {
  TodoCompleted,
  TodoFilter,
  TodoId,
  TodoList,
  TodoTitle,
} from '../types'

// Definir contexto para el value de provider
export interface TodoContextType {
  todoList: TodoList
  completedTodoCount: number
  pendingTodoCount: number
  allTodoCount: number
  activeFilter: TodoFilter
  createTodo: (title: TodoTitle) => void
  updateTodo: (id: TodoId, title: TodoTitle) => void
  removeTodo: (id: TodoId) => void
  checkTodo: (id: TodoId, completed: TodoCompleted) => void
  updateFilter: (filter: TodoFilter) => void
  removeAllCompletedTodos: () => void
}

export const TodoContext = createContext<TodoContextType | null>(null)
