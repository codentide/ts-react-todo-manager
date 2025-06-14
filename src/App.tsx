import { TodoControls, TodoList, TodoCreate } from './components'

const App = () => (
  <>
    <header>{/* nombre de app y de author, enlaces  */}</header>
    <section className="hero">
      {/* img brackgrouns */}
      <h1>React/TS To-do Manager</h1>
    </section>
    <main className="todo-container">
      <TodoCreate />
      <TodoList />
      <TodoControls />
    </main>
    <footer></footer>
  </>
)

export default App
