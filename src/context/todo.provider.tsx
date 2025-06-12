import { useState, type ReactNode } from 'react'
// import todoListMock from '../mock.json'
import type {
  Todo,
  TodoCompleted,
  TodoFilter,
  TodoId,
  TodoList,
  TodoTitle,
} from '../types'
import { TodoContext } from './todo.context'
import { TODO_FILTERS } from '../constants'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface TodoProviderProps {
  children: ReactNode | ReactNode[]
}

export const TodoProvider: React.FunctionComponent<TodoProviderProps> = ({
  children,
}) => {
  const [todoList, setTodoList] = useLocalStorage<TodoList>('todos', [])
  const [todoFilter, setTodoFilter] = useState<TodoFilter>('all')

  // Filter updater
  function updateFilter(filter: TodoFilter) {
    setTodoFilter(filter)
  }

  // Create a todo
  function createTodo(title: TodoTitle) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }

    const newTodoList = [...todoList, newTodo]
    setTodoList(newTodoList)
  }

  // Delete a todo
  function removeTodo(id: TodoId) {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  function updateTodo(id: TodoId, title: TodoId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) todo.title = title
      return todo
    })

    setTodoList(newTodoList)
  }

  // Complete or uncomplete a todo
  function checkTodo(id: TodoId, completed: TodoCompleted) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) todo.completed = completed
      return todo
    })
    setTodoList(newTodoList)
  }

  function removeAllCompletedTodos() {
    const newTodoList = todoList.filter((todo) => !todo.completed)
    setTodoList(newTodoList)
  }

  // Todo counts
  const allTodoCount = todoList.length
  const completedTodoCount = todoList.filter((todo) => todo.completed).length
  const pendingTodoCount = allTodoCount - completedTodoCount

  // Filtered todos
  const filteredTodoList = todoList.filter((todo) => {
    if (todoFilter === TODO_FILTERS.COMPLETED) return todo.completed
    if (todoFilter === TODO_FILTERS.PENDING) return !todo.completed
    return todo
  })

  return (
    <TodoContext.Provider
      value={{
        todoList: filteredTodoList,
        activeFilter: todoFilter,
        completedTodoCount,
        pendingTodoCount,
        allTodoCount,
        createTodo,
        updateTodo,
        removeTodo,
        checkTodo,
        updateFilter,
        removeAllCompletedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
