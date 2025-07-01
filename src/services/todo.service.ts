import type { PostgrestError } from '@supabase/supabase-js'
import type { TodoDatabase, TodoId } from '../types'
import { supabase } from '../supabase/client'

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

// Create todo in database

const createTodoDatabase = async (title: TodoDatabase['title']): Promise<SuccessSingleResult | FailedResult> => {
  const { data, error } = await supabase.from('todos').insert({ title }).select().single()
  if (error) {
    return { data: null, error }
  }
  return { error: null, data: data as TodoDatabase }
}

const getTodosDatabase = async (): Promise<SuccessResult | FailedResult> => {
  const { data, error } = await supabase.from('todos').select()
  if (error) {
    return { error, data: null }
  }
  return { error: null, data: data as TodoDatabase[] }
}

const removeTodoDatabase = async (id: TodoId): Promise<SuccessSingleResult | FailedResult> => {
  const { data, error } = await supabase.from('todos').delete().eq('id', id).select().single()

  if (error) {
    return { data: null, error }
  }

  return { error: null, data }
}

const removeTodosDatabase = async (ids: TodoId[]): Promise<PostgrestError | null> => {
  const { error } = await supabase.from('todos').delete().in('id', ids)
  return error
}

type todoUpdatePayload = Partial<Omit<TodoDatabase, 'id' | 'user_id' | 'created_at'>>

const updateTodoDatabase = async (id: TodoId, payload: todoUpdatePayload): Promise<PostgrestError | null> => {
  const { error } = await supabase.from('todos').update(payload).eq('id', id)
  return error
}

export { createTodoDatabase, getTodosDatabase, removeTodoDatabase, removeTodosDatabase, updateTodoDatabase }
