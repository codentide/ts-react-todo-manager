import type { FormEvent } from 'react'
import { signIn } from '../services/auth.service'

export const AuthPage = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement

    const userData = Object.fromEntries(new FormData(form)) as {
      email: string
      password: string
    }

    const data = await signIn(userData)

    console.log(data)
  }

  return (
    <section>
      <h1>Login</h1>
      <br />
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password</label>

        <input type="password" id="password" name="password" />

        <button>Submit</button>
      </form>
    </section>
  )
}
