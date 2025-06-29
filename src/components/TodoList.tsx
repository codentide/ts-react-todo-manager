import { Todoitem } from './TodoItem'
import type { TodoList as TodoListType } from '../types/auth.types'
import { useTodos, useTodoStore } from '../store/todo.store'
import { TODO_FILTERS } from '../constants'

export const TodoList: React.FunctionComponent = () => {
  const todos = useTodos()
  const filter = useTodoStore((state) => state.filter)
  const filteredTodos = todos.filter((todo) => {
    if (filter === TODO_FILTERS.COMPLETED) return todo.isChecked
    if (filter === TODO_FILTERS.PENDING) return !todo.isChecked
    return todo
  })

  function renderTodos(todos: TodoListType) {
    return todos.map((item) => (
      <li key={item.id}>
        <Todoitem {...item} />
      </li>
    ))
  }

  return <ul className="todo-list">{todos.length > 0 ? renderTodos(filteredTodos) : <div></div>}</ul>
}
