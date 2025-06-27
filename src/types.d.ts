import { TODO_FILTERS } from './constants'

// [ ]: Crear tipo cliente y tipo db de todo

interface TodoDatabase {
  id: string
  title: string
  is_checked: boolean
  user_id: string
  created_at: string
}

interface Todo {
  id: string
  title: string
  isChecked: boolean
  // completed: boolean
  createdAt?: string
}

type TodoTitle = Todo['title']
type TodoId = Todo['id']
type TodoList = Todo[]
type TodoIsChecked = Todo['isChecked']

type TodoFilter = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

// Quotes

interface Quote {
  author: string | null
  quote: string | null
}

interface QuoteAPI {
  author: string
  authorSlug: string
  content: string
  dateAdded: string
  dateModified: string
  length: number
  tags: string[]
  _id: string
}

export {
  TodoDatabase,
  Todo,
  TodoTitle,
  TodoId,
  TodoIsChecked,
  TodoList,
  TodoFilter,
  Quote,
  QuoteAPI,
  // ApiResponse,
}
