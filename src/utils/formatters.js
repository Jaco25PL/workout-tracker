export function fmtW(w) {
  const n = parseFloat(w);
  if (isNaN(n)) return '0kg';
  return (Number.isInteger(n) ? n : parseFloat(n.toFixed(1))) + 'kg';
}

export function cleanName(s) {
  if (!s) return '';
  const stripped = s.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{FE0F}\u{200D}]/gu, '');
  return stripped.replace(/\s+/g, ' ').trim();
}

export function parseWeight(s) {
  if (s === undefined || s === null) return null;
  const t = String(s).trim();
  if (!t) return null;
  const matches = t.match(/-?\d+(?:\.\d+)?/g);
  if (!matches) return 0;
  return parseFloat(matches[matches.length - 1]);
}

export function parseReps(s) {
  if (s === undefined || s === null) return null;
  const t = String(s).trim();
  if (!t) return null;
  if (!/^-?\d+$/.test(t)) return null;
  return parseInt(t, 10);
}

export function shouldSkipExercise(name) {
  if (!name) return true;
  const n = name.toLowerCase().trim();
  if (!n) return true;
  if (n === 'rest') return true;
  const skipWords = ['plank', 'walk', 'mobility', 'stretch', 'stretching', 'recover', 'rest &', 'rest and'];
  return skipWords.some(w => n.includes(w));
}
