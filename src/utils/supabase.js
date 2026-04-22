import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zptjmhagdhdhfkruixkq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdGptaGFnZGhkaGZrcnVpeGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTYyNzgsImV4cCI6MjA5MjI5MjI3OH0.Jt5AhpB4YOnoDfSJAy76fFwiHa41NZEFaaRHtkvxPJ0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
