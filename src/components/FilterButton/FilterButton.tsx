import { useTodoContext } from '../../hooks/useTodoContext'
import type { TodoFilter } from '../../types'
import './FilterButton.scss'

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
      className={`filter-box__filter ${className}`}
      onClick={() => updateFilter(filterValue)}
    >
      {label}
    </button>
  )
}
