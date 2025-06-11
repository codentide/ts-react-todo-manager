// interface Props {}

import { useTodoContext } from '../../hooks/useTodoContext'

export const TodoHeader: React.FunctionComponent = () => {
  const { createTodo } = useTodoContext()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const { title } = Object.fromEntries(formData) as { title: string }
    // Quiero resetear el formulario desde acá
    createTodo(title)
    form.reset()
  }

  function handleDoubleClick() {
    alert('dobleqclickeaste')
  }

  return (
    <header>
      <h1>To-Do APP</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          autoFocus
          onDoubleClick={handleDoubleClick}
        />
      </form>
    </header>
  )
}
