import { useTodoContext } from '../hooks/useTodoContext'
import { Todoitem } from './TodoItem'
import type { TodoList as TodoListType } from '../types'

export const TodoList: React.FunctionComponent = () => {
  const { todoList } = useTodoContext()

  function renderTodos(todos: TodoListType) {
    return todos.map((item) => (
      <li key={item.id}>
        <Todoitem {...item} />
      </li>
    ))
  }

  return <ul className="todo-list">{renderTodos(todoList)}</ul>
}
