import {
  TodoControls,
  TodoList,
  TodoCreate,
  Header,
  DailyQuote,
} from './components'

const App = () => (
  <>
    <Header />
    <section className="hero">{/* img brackgrouns */}</section>
    <main className="todo-container">
      <DailyQuote />
      <TodoCreate />
      <TodoList />
      <TodoControls />
    </main>
    <footer></footer>
  </>
)

export default App
