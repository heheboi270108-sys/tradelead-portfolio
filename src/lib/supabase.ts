import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bldbnbydvywcsqpoetlr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('VITE_SUPABASE_ANON_KEY is missing! Please add it to your Secrets in AI Studio.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey || '');
