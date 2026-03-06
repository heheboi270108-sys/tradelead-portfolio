import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bldbnbydvywcsqpoetlr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('VITE_SUPABASE_ANON_KEY is missing! Please add it to your environment variables.');
}
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('VITE_SUPABASE_URL is missing, using default URL.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey || '');
