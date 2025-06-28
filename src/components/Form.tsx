import { type ReactNode } from 'react'

interface Props {
  onSubmit: (data: object) => void
  className?: string
  children: ReactNode | ReactNode[]
}

export const Form = ({ className, onSubmit, children }: Props) => {
  const formClassName = `form-component ${className ? className : ''}`

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form))
    onSubmit(data)
  }

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
