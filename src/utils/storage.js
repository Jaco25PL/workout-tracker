import { DEFAULT_DATA } from '../constants';
import { supabase } from './supabase';

export function loadData() {
  try {
    const s = localStorage.getItem('wt_data2');
    if (s) return JSON.parse(s);
  } catch (e) { /* ignore */ }
  return DEFAULT_DATA;
}

export function saveData(d) {
  try {
    localStorage.setItem('wt_data2', JSON.stringify(d));
  } catch (e) { /* ignore */ }
}

// Pull data from Supabase for the current user
export async function pullData(userId) {
  const { data, error } = await supabase
    .from('workout_data')
    .select('data')
    .eq('user_id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // No row yet — return null so caller uses local data
    return null;
  }
  if (error) throw error;
  return data.data;
}

// Push data to Supabase for the current user
export async function pushData(userId, d) {
  const { error } = await supabase
    .from('workout_data')
    .upsert({ user_id: userId, data: d, updated_at: new Date().toISOString() });

  if (error) throw error;
}
