import { type ReactNode } from 'react'

interface Props<T extends object> {
  onSubmit: (data: T) => void
  className?: string
  children: ReactNode | ReactNode[]
}

export const Form = <T extends object>({ className, onSubmit, children }: Props<T>) => {
  const formClassName = `form-component ${className ? className : ''}`

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form))
    onSubmit(data as T)
  }

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
