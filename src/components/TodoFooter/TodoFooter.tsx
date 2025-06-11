import { TODO_FILTERS } from '../../constants'
import { useTodoContext } from '../../hooks/useTodoContext'
import type { TodoFilter } from '../../types'
import { FilterButton } from '../FilterButton/FilterButton'

const TODO_FILTER_BUTTONS = {
  [TODO_FILTERS.ALL]: 'Todos',
  [TODO_FILTERS.PENDING]: 'Pendientes',
  [TODO_FILTERS.COMPLETED]: 'Completados',
}

// Convertir objeto a array
const TODO_FILTER_BUTTON_ARRAY = Object.entries(TODO_FILTER_BUTTONS)

export const TodoFooter: React.FunctionComponent = () => {
  const { pendingTodoCount, completedTodoCount, removeAllCompletedTodos } =
    useTodoContext()

  return (
    <footer className="todo-footer">
      {pendingTodoCount > 0 && (
        <span className="todo-footer__pending-info">
          Pendientes: {pendingTodoCount}
        </span>
      )}
      <div className="todo-footer__filter-box">
        {TODO_FILTER_BUTTON_ARRAY.map(([key, literal]) => (
          <FilterButton
            key={key}
            filterValue={key as TodoFilter}
            label={literal}
          />
        ))}
      </div>
      {completedTodoCount > 0 && (
        <button
          className="todo-footer__btn delete-completed"
          onClick={removeAllCompletedTodos}
        >
          Borrar Completados
        </button>
      )}
    </footer>
  )
}
