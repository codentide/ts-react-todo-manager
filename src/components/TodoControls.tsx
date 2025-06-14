import { TODO_FILTERS } from '../constants'
import { useTodoContext } from '../hooks/useTodoContext'
import { FilterButton } from './FilterButton'
import type { TodoFilter } from '../types'

const TODO_FILTER_BUTTONS = {
  [TODO_FILTERS.ALL]: 'All',
  [TODO_FILTERS.PENDING]: 'Pending',
  [TODO_FILTERS.COMPLETED]: 'Done',
}

// Convertir objeto a array
const TODO_FILTER_BUTTON_ARRAY = Object.entries(TODO_FILTER_BUTTONS)

export const TodoControls: React.FunctionComponent = () => {
  const { pendingTodoCount, completedTodoCount, removeAllCompletedTodos } =
    useTodoContext()

  const deleteDoneButtonClass = `todo-controls__delete-done-button  ${
    completedTodoCount > 0 ? 'active' : ''
  }`
  const pendingCountClass = `todo-controls__pending-count ${
    pendingTodoCount > 0 ? 'active' : ''
  }`

  return (
    <section className="todo-controls">
      <span className={pendingCountClass}>{pendingTodoCount} Item left</span>

      <div className="filter-container">
        {TODO_FILTER_BUTTON_ARRAY.map(([key, literal]) => (
          <FilterButton
            key={key}
            filterValue={key as TodoFilter}
            label={literal}
          />
        ))}
      </div>

      <button
        className={deleteDoneButtonClass}
        onClick={removeAllCompletedTodos}
      >
        Clear done
      </button>
    </section>
  )
}
