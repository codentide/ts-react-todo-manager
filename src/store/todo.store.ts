import { create } from 'zustand'
import type { Todo, TodoIsChecked, TodoFilter, TodoId, TodoTitle } from '../types'
import {
  createTodoDatabase,
  getTodosDatabase,
  removeTodoDatabase,
  removeTodosDatabase,
  updateTodoDatabase,
} from '../services/todo.service'
import { adaptTodo, adaptTodoArray } from '../adapters/todo.adapter'

interface State {
  todos: Todo[]
  filter: TodoFilter
  isLoading: boolean
  error: string | null
}

// [ ]: Añadir isLoading y error al estado

interface Actions {
  getTodos: () => Promise<void>
  createTodo: (title: string) => Promise<void>
  updateFilter: (filter: TodoFilter) => void
  updateTodoTitle: (id: TodoId, title: TodoTitle) => Promise<void>
  deleteTodo: (id: TodoId) => Promise<void>
  toggleTodo: (id: TodoId, value: TodoIsChecked) => Promise<void>
  deleteAllDone: () => Promise<void>
}

export const useTodoStore = create<State & Actions>((set, get) => ({
  todos: [],
  filter: 'all',
  isLoading: false,
  error: null,
  updateFilter: (filter) => set({ filter }),
  getTodos: async () => {
    set({ isLoading: true, error: null })
    const { data, error } = await getTodosDatabase()

    if (!error) {
      const adaptedTodoArray = adaptTodoArray(data)
      set({ todos: adaptedTodoArray, isLoading: false })
    }
  },
  // Creación de todo con el patrón de actualizacion optimista
  createTodo: async (title) => {
    // Crear Todo del lado del cliente (Actualización inmediata)
    const optimisticTodo: Todo = {
      id: Date.now().toString(),
      title,
      isChecked: false,
    }

    // Guardar en el estado del cliente
    set((state) => ({ todos: [...state.todos, optimisticTodo] }))

    // Iniciar proceso de creación del Todo en la base de datos
    const { data, error } = await createTodoDatabase(optimisticTodo.title)
    const { todos } = get()

    // Si la petición a la base de datos fue exitosa
    if (!error) {
      // Reemplazar el todo del cliente por el de la base de datos (imperceptible)
      const adaptedTodo = adaptTodo(data)
      const newTodos = todos.map((todo) => {
        return optimisticTodo.id === todo.id ? adaptedTodo : todo
      })

      set({ todos: newTodos })
    } else {
      console.error(error)
      const newTodos = todos.filter((todo) => optimisticTodo.id !== todo.id)
      set({ todos: newTodos })
    }
  },
  deleteTodo: async (id) => {
    const { todos } = get()

    // Guardar referencia para reversión (el index es importatne para reinsertarlo en la misma posicion)
    const deletedTodoIndex = todos.findIndex((item) => item.id === id)
    const deletedTodo = todos[deletedTodoIndex]

    const newTodos = todos.filter((todo) => todo.id !== id)
    set({ todos: newTodos })

    // También devuelve el elemento borrado
    const { error } = await removeTodoDatabase(id)

    // Reversión
    if (error) {
      set((state) => {
        const newTodos = [...state.todos]
        // Insertar el elemento borrado en su misma posición
        newTodos.splice(deletedTodoIndex, 0, deletedTodo)
        console.error(error)
        return { todos: newTodos, error: 'Error al intentar eliminar una tarea: ' + error }
      })
    }
  },
  updateTodoTitle: async (id, title) => {
    const { todos } = get()

    // Estado anterior del elemento
    const updatedTodoIndex = todos.findIndex((item) => item.id === id)
    const updatedTodo = todos[updatedTodoIndex]

    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    set({ todos: newTodos })

    // Operacion en base de datos
    const error = await updateTodoDatabase(id, { title })

    if (error) {
      console.error(error)
      set((state) => {
        const newTodos = [...state.todos]
        newTodos.splice(updatedTodoIndex, 1, updatedTodo)
        return { todos: newTodos }
      })
    }
  },
  toggleTodo: async (id, value) => {
    const { todos } = get()

    const optimisticTodos = todos.map((todo) => (todo.id === id ? { ...todo, isChecked: value } : todo))
    set({ todos: optimisticTodos })

    const error = await updateTodoDatabase(id, { is_checked: value })

    if (error) {
      set((state) => {
        console.error(error)
        const revertedTodos = state.todos.map((todo) => {
          return todo.id === id ? { ...todo, isChecked: !value } : todo
        })

        return { todos: revertedTodos }
      })
    }
  },
  deleteAllDone: async () => {
    const { todos } = get()

    // Sacar los ids de los elementos a eliminar
    const todosToRemoveIds = todos.filter((todo) => todo.isChecked).map((todo) => todo.id)

    // Operacion optimista
    const optimisticTodos = todos.filter((todo) => !todo.isChecked)
    set({ todos: optimisticTodos })

    const error = await removeTodosDatabase(todosToRemoveIds)

    if (error) {
      console.error(error)
      const revertedTodos = structuredClone(todos)
      set({ todos: revertedTodos })
    }
  },
}))

export const useTodos = () => useTodoStore((state) => state.todos)
