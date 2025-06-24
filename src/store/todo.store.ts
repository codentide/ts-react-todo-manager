import { create } from 'zustand'
import type {
  Todo,
  TodoCompleted,
  TodoFilter,
  TodoId,
  TodoTitle,
} from '../types'
import { persist } from 'zustand/middleware'

interface State {
  todos: Todo[]
  filter: TodoFilter
  updateFilter: (filter: TodoFilter) => void
  createTodo: (title: string) => void
  updateTodoTitle: (id: TodoId, title: TodoTitle) => void
  deleteTodo: (id: TodoId) => void
  toggleTodo: (id: TodoId, value: TodoCompleted) => void
  deleteAllDone: () => void
}

export const useTodoStore = create<State>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      updateFilter: (filter) => set({ filter }),
      createTodo: (title) => {
        const newTodo = {
          id: Date.now().toString(),
          title,
          completed: false,
        }
        set((state) => ({ todos: [...state.todos, newTodo] }))
      },
      deleteTodo: (id) => {
        const { todos } = get()
        const newTodos = todos.filter((todo) => todo.id !== id)
        set({ todos: newTodos })
      },
      updateTodoTitle: (id, title) => {
        const { todos } = get()
        const newTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, title } : todo
        )
        set({ todos: newTodos })
      },
      toggleTodo: (id, value) => {
        const { todos } = get()
        const newTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: value } : todo
        )
        set({ todos: newTodos })
      },
      deleteAllDone: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    { name: 'todos' }
  )
)

export const useTodos = () => useTodoStore((state) => state.todos)
