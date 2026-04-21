import { DEFAULT_DATA } from '../constants';

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
