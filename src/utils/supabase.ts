'use client'

import { createClient } from '@supabase/supabase-js'

type SupabaseError = {
  message: string
}

// Ensure these are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

// Utility type for market entry
export interface MarketEntry {
  id: number
  player_name: string
  share_value: number
  created_at: string
}

// Utility function for consistent error handling
export async function safeSupabaseCall<T>(
  operation: () => Promise<{ data: T | null; error: SupabaseError | null }>,
  errorMessage = 'An error occurred'
): Promise<{ data: T | null; error: string | null }> {
  try {
    const { data, error } = await operation()
    
    if (error) {
      console.error(`${errorMessage}:`, error)
      return { 
        data: null, 
        error: error.message || errorMessage 
      }
    }
    
    return { data, error: null }
  } catch (err) {
    console.error(`Unexpected error in ${errorMessage}:`, err)
    return { 
      data: null, 
      error: err instanceof Error ? err.message : errorMessage 
    }
  }
}

// Specific utility functions for market entries
export async function fetchMarketEntries(): Promise<{ 
  data: MarketEntry[] | null; 
  error: string | null 
}> {
  return safeSupabaseCall(async () => {
    const result = await supabase.from('market_entries').select('*').order('created_at')
    return result
  }, 'Failed to fetch market entries')
}

export async function deleteMarketEntry(id: number): Promise<{ 
  data: null; 
  error: string | null 
}> {
  return safeSupabaseCall(async () => {
    const result = await supabase.from('market_entries').delete().eq('id', id)
    return result
  }, 'Failed to delete market entry')
}

export async function insertMarketEntry(entry: {
  player_name: string
  share_value: number
}): Promise<{ 
  data: MarketEntry | null; 
  error: string | null 
}> {
  return safeSupabaseCall(async () => {
    const result = await supabase.from('market_entries').insert(entry).select().single()
    return result
  }, 'Failed to insert market entry')
}
