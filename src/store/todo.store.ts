import { create } from 'zustand'
import type { Todo, TodoIsChecked, TodoFilter, TodoId, TodoTitle } from '../types'
import { createTodoDatabase, getTodosDatabase, removeTodoDatabase } from '../services/todo.service'
import { adaptTodo, adaptTodoArray } from '../adapters/todo.adapter'

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
    // Crear Todo cliente
    const clientTodo: Todo = {
      id: Date.now().toString(),
      title,
      isChecked: false,
    }

    // Guardar en el estado cliente (Actualización optimista)
    set((state) => ({ todos: [...state.todos, clientTodo] }))

    // Crear todo base de datos
    const { data, error } = await createTodoDatabase(clientTodo.title)
    const { todos } = get()

    if (!error) {
      const adaptedTodo = adaptTodo(data)
      const newTodos = todos.map((todo) => {
        return clientTodo.id === todo.id ? adaptedTodo : todo
      })

      set({ todos: newTodos })
    } else {
      const newTodos = todos.filter((todo) => clientTodo.id !== todo.id)

      set({ todos: newTodos })
    }
  },
  deleteTodo: async (id) => {
    const { todos } = get()
    const newTodos = todos.filter((todo) => todo.id !== id)
    set({ todos: newTodos })

    await removeTodoDatabase(id)
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
