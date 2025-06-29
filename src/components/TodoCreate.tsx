import { useState } from 'react'
import { useTodoActions } from '../store/todo.store'

export const TodoCreate: React.FunctionComponent = (): React.JSX.Element => {
  const { createTodo } = useTodoActions()
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const { title: value } = Object.fromEntries(formData) as { title: string }

    if (inputValue === '') {
      setInputError('The field cannot be empty')
      return
    }

    if (value.trim().length < 3) {
      setInputError('Type at least 3 characters')
      return
    }

    createTodo(value.trim())
    setInputValue('')
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputError(null)

    const input = event.target as HTMLInputElement
    const value = input.value

    if (value.trim() === '') {
      setInputValue('')
      return
    }
    // No permite mas de un espacio entre palabras
    const cleanedValue = value.replace(/\s{2,}/g, ' ')

    setInputValue(cleanedValue)
  }

  return (
    <form className={`create-form ${inputError ? 'error' : ''}`} onSubmit={handleSubmit}>
      <input
        className="create-form__create-input"
        type="text"
        name="title"
        placeholder="What you want to do?"
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setInputError(null)}
      />
      {inputError && <span className="error-message">{inputError}</span>}
    </form>
  )
}
