import type { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '../supabase/client'
import type { TodoDatabase, TodoId } from '../types'

interface FailedResult {
  error: PostgrestError
  data: null
}

interface SuccessResult {
  error: null
  data: TodoDatabase[]
}

interface SuccessSingleResult {
  error: null
  data: TodoDatabase
}

const createTodoDatabase = async (title: TodoDatabase['title']): Promise<SuccessSingleResult | FailedResult> => {
  const { data, error } = await supabase.from('todos').insert({ title }).select().single()
  if (error) {
    console.error(error)
    return { data: null, error }
  }
  return { error: null, data: data as TodoDatabase }
}

const getTodosDatabase = async (): Promise<SuccessResult | FailedResult> => {
  const { data, error } = await supabase.from('todos').select()
  if (error) {
    console.error(error)
    return { error, data: null }
  }
  return { error: null, data: data as TodoDatabase[] }
}

const removeTodoDatabase = async (id: TodoId): Promise<SuccessResult | FailedResult> => {
  const { data, error } = await supabase.from('todos').delete().eq('id', id).select()

  if (error) {
    return { data: null, error }
  }

  return { error: null, data }
}

export { createTodoDatabase, getTodosDatabase, removeTodoDatabase }
