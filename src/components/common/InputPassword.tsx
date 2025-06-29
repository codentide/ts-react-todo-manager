import { useState } from 'react'
import EyeIcon from '../../assets/svg/eye.svg?react'
import EyeOffIcon from '../../assets/svg/eye-off.svg?react'

interface Props {
  id?: string
}

export const InputPassword = ({ id }: Props) => {
  const [isPassword, setIsPassword] = useState<boolean>(true)

  const inputId = id ? id : ''

  return (
    <div className="input-password">
      {isPassword ? (
        <input type="password" id={inputId} name={inputId} />
      ) : (
        <input type="text" id={inputId} name={inputId} />
      )}
      <button type="button" className="input-password__toggle-button" onClick={() => setIsPassword(!isPassword)}>
        {isPassword ? <EyeIcon /> : <EyeOffIcon />}
      </button>
    </div>
  )
}
