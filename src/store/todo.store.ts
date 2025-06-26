import { create } from 'zustand'
import type { Todo, TodoIsChecked, TodoFilter, TodoId, TodoTitle } from '../types'
import { createTodoDatabase, getTodosDatabase } from '../services/todo.service'
import { adaptTodoArray } from '../adapters/todo.adapter'

interface State {
  todos: Todo[]
  filter: TodoFilter
}

// [ ]: Añadir isLoading y error al estado

interface Actions {
  getTodos: () => Promise<void>
  createTodo: (title: string) => Promise<void>
  updateFilter: (filter: TodoFilter) => void
  updateTodoTitle: (id: TodoId, title: TodoTitle) => void
  deleteTodo: (id: TodoId) => void
  toggleTodo: (id: TodoId, value: TodoIsChecked) => void
  deleteAllDone: () => void
}

export const useTodoStore = create<State & Actions>((set, get) => ({
  todos: [],
  filter: 'all',
  updateFilter: (filter) => set({ filter }),
  getTodos: async () => {
    const { data, error } = await getTodosDatabase()

    if (!error) {
      const adaptedTodoArray = adaptTodoArray(data)
      set({ todos: adaptedTodoArray })
    }
  },
  createTodo: async (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      isChecked: false,
    }

    set((state) => ({ todos: [...state.todos, newTodo] }))
    // [ ]: Unificar esta lógica
    await createTodoDatabase({ title })
  },
  deleteTodo: (id) => {
    const { todos } = get()
    const newTodos = todos.filter((todo) => todo.id !== id)
    set({ todos: newTodos })
  },
  updateTodoTitle: (id, title) => {
    const { todos } = get()
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    set({ todos: newTodos })
  },
  toggleTodo: (id, value) => {
    const { todos } = get()
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, isChecked: value } : todo))
    set({ todos: newTodos })
  },
  deleteAllDone: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.isChecked),
    })),
}))

export const useTodos = () => useTodoStore((state) => state.todos)
