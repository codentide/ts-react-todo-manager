import { TODO_FILTERS } from './constants'

interface Todo {
  id: string
  title: string
  completed: boolean
}

type TodoTitle = Todo['title']
type TodoId = Todo['id']
type TodoList = Todo[]
type TodoCompleted = Todo['completed']

// [ ]: Leer documentacion sobre esto en conjunto con el as const
type TodoFilter = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

export { Todo, TodoTitle, TodoId, TodoCompleted, TodoList, TodoFilter }
