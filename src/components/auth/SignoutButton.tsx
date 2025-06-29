import type { ReactNode } from 'react'
import { LoadingSpinner } from '../common'
import { useAuthActions, useAuthLoading } from '../../store'

interface Props {
  children?: ReactNode
}

export const SignoutButton = ({ children }: Props) => {
  const { signout } = useAuthActions()
  const isLoading = useAuthLoading()

  return (
    <button className="signout-button" onClick={signout}>
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  )
}
