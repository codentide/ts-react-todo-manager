import { TodoControls, TodoList, TodoCreate, Header } from './components'

const App = () => (
  <>
    <Header />
    <main className="todo-container">
      {/* <DailyQuote /> */}

      <TodoCreate />
      <TodoList />
      <TodoControls />
    </main>
    <footer></footer>
  </>
)

export default App
