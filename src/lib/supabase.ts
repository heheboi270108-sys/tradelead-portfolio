import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bldbnbydvywcsqpoetlr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client if the key is missing to prevent the app from crashing on load
export const supabase = supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        insert: () => ({ 
          select: () => Promise.resolve({ data: null, error: { message: 'Supabase key missing' } }) 
        }),
        select: () => Promise.resolve({ data: [], error: { message: 'Supabase key missing' } }),
      })
    } as any;

if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY is missing! Database features will be disabled.');
}
