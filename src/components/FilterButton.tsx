import { useTodoActions, useTodoStore } from '../store/todo.store'
import type { TodoFilter } from '../types/auth.types'

interface Props {
  filterValue: TodoFilter
  label: string
}

export const FilterButton: React.FunctionComponent<Props> = ({ filterValue, label }) => {
  const { updateFilter } = useTodoActions()
  const filter = useTodoStore((state) => state.filter)
  const className = filter === filterValue ? 'active' : ''

  return (
    <button className={`filter-container__filter-button ${className}`} onClick={() => updateFilter(filterValue)}>
      {label}
    </button>
  )
}
