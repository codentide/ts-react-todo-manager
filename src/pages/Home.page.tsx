import { useEffect } from 'react'
import { SignoutButton, TodoControls, TodoCreate, TodoList } from '../components'

import { useTodoActions } from '../store/todo.store'
import { useAuthUser } from '../store/auth.store'

export const HomePage = () => {
  const { getTodos } = useTodoActions()
  const user = useAuthUser()
  // Información adicional del usuario (por ahora solo username)
  const userData = user?.user_metadata

  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <section className="home-page">
      <div className="user-header">
        <p>{userData?.name}</p>
        <SignoutButton children="Log out" />
      </div>

      <div className="todo-app">
        <TodoCreate />
        <TodoList />
        <TodoControls />
      </div>
    </section>
  )
}
