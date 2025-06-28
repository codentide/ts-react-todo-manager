import type { TodoFilter } from '../types'
import { TODO_FILTERS } from '../constants'
import { FilterButton } from './FilterButton'
import { useTodoStore } from '../store/todo.store'

const TODO_FILTER_BUTTONS = {
  [TODO_FILTERS.ALL]: 'All',
  [TODO_FILTERS.PENDING]: 'Pending',
  [TODO_FILTERS.COMPLETED]: 'Done',
}

// Convertir objeto a array
const TODO_FILTER_BUTTON_ARRAY = Object.entries(TODO_FILTER_BUTTONS)

export const TodoControls: React.FunctionComponent = () => {
  const deleteAllDone = useTodoStore((state) => state.deleteAllDone)

  const todos = useTodoStore((state) => state.todos)
  const doneTodoCount: number = todos.filter((todo) => todo.isChecked).length
  const undoneTodoCount: number = todos.length - doneTodoCount

  return (
    <section className="todo-controls">
      <span className="todo-controls__pending-count">{undoneTodoCount} Item left</span>

      <div className="filter-container">
        {TODO_FILTER_BUTTON_ARRAY.map(([key, literal]) => (
          <FilterButton key={key} filterValue={key as TodoFilter} label={literal} />
        ))}
      </div>

      <button
        className={`todo-controls__delete-done-button  ${doneTodoCount > 0 ? 'active' : ''}`}
        onClick={deleteAllDone}
      >
        Clear done
      </button>
    </section>
  )
}
