import { useState } from 'react'
import { useTodoContext } from '../hooks/useTodoContext'
import type { TodoCompleted, TodoId, TodoTitle } from '../types'
// import './TodoItem.scss'

interface Props {
  id: TodoId
  title: TodoTitle
  completed: TodoCompleted
}

export const Todoitem: React.FunctionComponent<Props> = ({
  id,
  title,
  completed,
}) => {
  const { removeTodo, checkTodo, updateTodo } = useTodoContext()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(title)

  const handleTodoRemove = () => removeTodo(id)
  const handleTodoCheck = () => checkTodo(id, !completed)
  const handleDoubleClick = () => setIsEditing(true)
  const handleUpdateTodo = (title: TodoTitle) => updateTodo(id, title)
  const handleBlur = () => {
    setInputValue(title)
    setIsEditing(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.key.toLowerCase()
    const input = event.target as HTMLInputElement

    if (key === 'escape') {
      input.blur()
    } else if (key === 'enter') {
      handleUpdateTodo(inputValue)
      setIsEditing(false)
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement
    const { value } = input
    setInputValue(value)
  }

  return (
    <div className={`todo-item ${isEditing ? 'editing' : ''}`}>
      <input
        className="todo-item__checkbox"
        data-id={id}
        type="checkbox"
        name="isCompleted"
        checked={completed}
        onChange={handleTodoCheck}
      />
      {isEditing ? (
        <input
          className="todo-item__input-edit"
          type="text"
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <label className="todo-item__label" onDoubleClick={handleDoubleClick}>
          {title}
        </label>
      )}

      {!isEditing && (
        // [ ] reemplazar por svg
        <button className="todo-item__remove-button" onClick={handleTodoRemove}>
          ×
        </button>
      )}
    </div>
  )
}
