import type { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '../supabase/client'
import type { TodoDatabase } from '../types'

interface TodoDb {
  title: string
  id?: number
  is_checked?: boolean
}

const createTodoDatabase = async ({ title }: TodoDb) => {
  const { status, error } = await supabase.from('todos').insert({ title })

  if (error) {
    console.error(error, status)
    return { error }
  }

  return { error: null }
}

const getTodosDatabase = async (): Promise<
  | {
      error: PostgrestError
      data: null
    }
  | {
      error: null
      data: TodoDatabase[]
    }
> => {
  const { data, error } = await supabase.from('todos').select()

  if (error) {
    console.error(error)
    return { error, data: null }
  }

  console.log(data)
  return { error: null, data }
}

export { createTodoDatabase, getTodosDatabase }
