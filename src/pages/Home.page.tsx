import { useEffect } from 'react'
import { TodoControls, TodoCreate, TodoList } from '../components'
import { signOut } from '../services/auth.service'
import { useTodoStore } from '../store/todo.store'
import { useAuthStore } from '../store/auth.store'

export const HomePage = () => {
  const getTodos = useTodoStore((state) => state.getTodos)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <>
      <p>{user?.email}</p>
      <br />
      <button onClick={signOut}>Logout</button>
      <br />
      <TodoCreate />
      <TodoList />
      <TodoControls />
    </>
  )
}
