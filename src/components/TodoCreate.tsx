import { useTodoContext } from '../hooks/useTodoContext'

// [ ]: Controlar espacios vacíos

export const TodoCreate: React.FunctionComponent = (): React.JSX.Element => {
  const { createTodo } = useTodoContext()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const { title } = Object.fromEntries(formData) as { title: string }
    createTodo(title)
    form.reset()
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input
        className="create-form__create-input"
        type="text"
        name="title"
        placeholder="What you want to do?"
        autoFocus
      />
    </form>
  )
}
