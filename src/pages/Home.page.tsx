import { useEffect } from 'react'
import { TodoControls, TodoCreate, TodoList } from '../components'
import { signOut } from '../services/auth.service'
import { useTodoActions } from '../store/todo.store'
import { useAuthUser } from '../store/auth.store'

export const HomePage = () => {
  const { getTodos } = useTodoActions()
  const user = useAuthUser()

  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <>
      <p>{user?.user_metadata.name}</p>
      <br />
      <button onClick={signOut}>Logout</button>
      <br />
      <TodoCreate />
      <TodoList />
      <TodoControls />
    </>
  )
}
