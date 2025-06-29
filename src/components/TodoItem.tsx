import type { TodoIsChecked, TodoId, TodoTitle } from '../types/auth.types'
import { useState } from 'react'
import { useTodoActions } from '../store/todo.store'
import { CheckBox } from './CheckBox'
import CrossSVG from '../assets/svg/small-cross.svg?react'

interface Props {
  id: TodoId
  title: TodoTitle
  isChecked: TodoIsChecked
}

export const Todoitem: React.FunctionComponent<Props> = ({ id, title, isChecked }) => {
  const { deleteTodo, updateTodoTitle, toggleTodo } = useTodoActions()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(title)
  const [inputError, setInputError] = useState<string | null>(null)

  const handleTodoRemove = () => deleteTodo(id)
  const handleTodoCheck = () => toggleTodo(id, !isChecked)
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
      <CheckBox name="isisChecked" checked={isChecked} onChange={handleTodoCheck} />
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
        <button className="todo-item__remove-button" onClick={handleTodoRemove}>
          <CrossSVG />
        </button>
      )}

      {inputError && <span className="error-message">{inputError}</span>}
    </div>
  )
}
