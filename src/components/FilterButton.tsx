import { useTodoContext } from '../hooks/useTodoContext'
import type { TodoFilter } from '../types'

interface Props {
  filterValue: TodoFilter
  label: string
}

export const FilterButton: React.FunctionComponent<Props> = ({
  filterValue,
  label,
}) => {
  const { updateFilter, activeFilter } = useTodoContext()
  const className = activeFilter === filterValue ? 'active' : ''

  return (
    <button
      className={`filter-container__filter-button ${className}`}
      onClick={() => updateFilter(filterValue)}
    >
      {label}
    </button>
  )
}
