import type React from 'react'

interface Props {
  name?: string
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckBox: React.FunctionComponent<Props> = ({ name, checked, onChange }) => {
  return <input className="checkbox" type="checkbox" name={name} checked={checked} onChange={onChange} />
}
