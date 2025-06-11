import { useEffect, useRef, useState } from 'react'
import { useTodoContext } from '../../hooks/useTodoContext'
import type { TodoCompleted, TodoId, TodoTitle } from '../../types'
import './TodoItem.scss'

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
  // Funciones para interactuar con el estado global
  const { removeTodo, checkTodo, updateTodo } = useTodoContext()
  // Estado para activar el modo edicion
  const [isEditing, setIsEditing] = useState<boolean>(false)
  // Valor para controlar el input
  const [inputValue, setInputValue] = useState<string>(title)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTodoRemove = () => removeTodo(id)
  const handleTodoCheck = () => checkTodo(id, !completed)
  const handleDoubleClick = () => setIsEditing(true)
  const handleUpdateTodo = (title: TodoTitle) => updateTodo(id, title)
  const handleBlur = () => setIsEditing(false)

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.key.toLowerCase()
    const input = event.target as HTMLInputElement

    if (key === 'escape') {
      input.blur()
      setInputValue(title)
    } else if (key === 'enter') {
      handleUpdateTodo(input.value)
      input.blur()
    }
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement
    const { value } = input
    setInputValue(value)
  }

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus()
  }, [isEditing])

  return (
    <div className="todo-item">
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
          className="todo-item__edit"
          type="text"
          ref={inputRef}
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <label className="todo-item__label" onDoubleClick={handleDoubleClick}>
          {title}
        </label>
      )}

      <button className="todo-item__remove-btn" onClick={handleTodoRemove}>
        ×
      </button>
    </div>
  )
}
