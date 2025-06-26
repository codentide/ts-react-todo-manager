import { createClient } from '@supabase/supabase-js'

const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(BASE_URL, API_KEY)
