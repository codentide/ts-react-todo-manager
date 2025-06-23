import type { TodoCompleted, TodoId, TodoTitle } from '../types'
import { useState } from 'react'
// import './TodoItem.scss'

import CrossSVG from '../assets/svg/small-cross.svg?react'
import { useTodoStore } from '../store/todo.store'

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
  const deleteTodo = useTodoStore((state) => state.deleteTodo)
  const updateTodoTitle = useTodoStore((state) => state.updateTodoTitle)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(title)
  const [inputError, setInputError] = useState<string | null>(null)

  const handleTodoRemove = () => deleteTodo(id)
  const handleTodoCheck = () => toggleTodo(id, !completed)
  const handleDoubleClick = () => setIsEditing(true)
  const handleUpdateTodo = (title: TodoTitle) => updateTodoTitle(id, title)
  const handleBlur = () => {
    setInputError(null)
    setInputValue(title)
    setIsEditing(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.key.toLowerCase()
    const input = event.target as HTMLInputElement

    if (key === 'escape') {
      input.blur()
    }

    if (key === 'enter') {
      if (inputError) return

      handleUpdateTodo(inputValue)
      setIsEditing(false)
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputError(null)

    const input = event.target as HTMLInputElement
    const value = input.value

    if (value.length < 3) {
      setInputError('Type at least 3 characters')
    }

    if (value.trim() === '') {
      setInputError('The field cannot be empty')
      setInputValue('')
      return
    }

    // No permite mas de un espacio entre palabras
    const cleanedValue = value.replace(/\s{2,}/g, ' ')

    setInputValue(cleanedValue)
  }

  const isEditClass = isEditing ? 'editing' : ''
  const hasErrorClass = inputError ? 'error' : ''

  return (
    <div className={`todo-item ${isEditClass} ${hasErrorClass}`}>
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
          <CrossSVG />
        </button>
      )}

      {inputError && <span className="error-message">{inputError}</span>}
    </div>
  )
}
