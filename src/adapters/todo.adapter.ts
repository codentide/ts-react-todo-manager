import type { Todo, TodoDatabase } from '../types'

const adaptTodo = ({ id, title, is_checked, created_at }: TodoDatabase): Todo => {
  return {
    id,
    title,
    isChecked: is_checked,
    createdAt: created_at,
  }
}

export const adaptTodoArray = (unadaptedTodoArray: TodoDatabase[]): Todo[] => {
  return unadaptedTodoArray.map((unadaptedTodo) => adaptTodo(unadaptedTodo))
}
