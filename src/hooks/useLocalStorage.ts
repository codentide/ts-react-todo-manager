import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Ocurrió un error leyendo el localStorage', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Ocurrió un error escribiendo en el localStorage', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

/*

[storedValue, setStoredValue]

setStoredValue(value) = (value: T) => void
setStoredValue((prev => prev + 1)) = ((prev: T) => T) => void

[T, (value: T | ((prev: T) => T )) => void]
[T, React.Dispatch<SetStateAction<T>>]

*/
