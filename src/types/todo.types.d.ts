import { TODO_FILTERS } from '../constants'

// [ ]: Crear tipo cliente y tipo db de todo

export interface TodoDatabase {
  id: string
  title: string
  is_checked: boolean
  user_id: string
  created_at: string
}

export interface Todo {
  id: string
  title: string
  isChecked: boolean
  createdAt?: string
}

export type TodoTitle = Todo['title']
export type TodoId = Todo['id']
export type TodoList = Todo[]
export type TodoIsChecked = Todo['isChecked']

export type TodoFilter = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]
