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
  Todo,
  TodoTitle,
  TodoId,
  TodoCompleted,
  TodoList,
  TodoFilter,
  Quote,
  QuoteAPI,
}
