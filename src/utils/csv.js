import { DAY_NAMES } from '../constants';
import { uid } from './uid';
import { cleanName, parseWeight, parseReps, shouldSkipExercise } from './formatters';

export function parseCSVLine(line) {
  const out = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') { q = false; }
      else { cur += c; }
    } else {
      if (c === '"') { q = true; }
      else if (c === ',') { out.push(cur); cur = ''; }
      else { cur += c; }
    }
  }
  out.push(cur);
  return out;
}

export function exportCSV(data) {
  let maxRows = 0;
  data.days.forEach(d => {
    if (d.isRest) return;
    const total = d.exercises.reduce((a, ex) => a + ex.sets.length, 0);
    if (total > maxRows) maxRows = total;
  });
  if (maxRows === 0) maxRows = 1;

  const quote = c => `"${String(c).replace(/"/g, '""')}"`;

  const titleRow = ['Weekly Workout'].concat(Array(20).fill(''));
  const dayHeaderRow = [];
  data.days.forEach(d => {
    const label = d.isRest
      ? `${d.name.toUpperCase()} — REST`
      : (d.category ? `${d.name.toUpperCase()} — ${d.category}` : d.name.toUpperCase());
    dayHeaderRow.push(label, '', '');
  });

  const colHeaderRow = [];
  data.days.forEach(() => { colHeaderRow.push('Exercise', 'Reps', 'Weight'); });

  const dayCells = data.days.map(d => {
    if (d.isRest) {
      const out = [['REST', '', '']];
      while (out.length < maxRows) out.push(['', '', '']);
      return out;
    }
    const cells = [];
    d.exercises.forEach(ex => {
      ex.sets.forEach((s, si) => {
        const name = si === 0 ? ex.name : '';
        cells.push([name, String(s.reps ?? ''), s.weight ? `${s.weight}kg` : '']);
      });
    });
    while (cells.length < maxRows) cells.push(['', '', '']);
    return cells;
  });

  const dataRows = [];
  for (let r = 0; r < maxRows; r++) {
    const row = [];
    for (let di = 0; di < 7; di++) {
      const cell = dayCells[di][r] || ['', '', ''];
      row.push(cell[0], cell[1], cell[2]);
    }
    dataRows.push(row);
  }

  const all = [titleRow, dayHeaderRow, colHeaderRow, ...dataRows];
  const csv = all.map(r => r.map(quote).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'workout.csv';
  a.click();
}

export function importCSV(file, data) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const rawLines = ev.target.result.split(/\r?\n/).filter(l => l.length > 0);
        if (rawLines.length < 3) throw new Error('Empty');
        const rows = rawLines.map(parseCSVLine);

        const dayRegex = new RegExp('\\b(' + DAY_NAMES.join('|') + ')\\b', 'i');
        let dayHeaderIdx = -1;
        for (let i = 0; i < Math.min(5, rows.length); i++) {
          if (rows[i].some(c => dayRegex.test(c))) { dayHeaderIdx = i; break; }
        }
        if (dayHeaderIdx < 0) throw new Error('No day header row found');

        const dayCols = {};
        const dayHeader = rows[dayHeaderIdx];
        dayHeader.forEach((cell, colIdx) => {
          const txt = cell.trim();
          if (!txt) return;
          const m = txt.match(dayRegex);
          if (!m) return;
          const di = DAY_NAMES.findIndex(n => n.toLowerCase() === m[1].toLowerCase());
          if (di < 0) return;
          const parts = txt.split(/—|-/);
          let cat = '';
          if (parts.length > 1) cat = cleanName(parts.slice(1).join('-')).toUpperCase();
          if (cat === 'REST') cat = '';
          dayCols[colIdx] = { di, category: cat };
        });

        if (Object.keys(dayCols).length === 0) throw new Error('No day columns detected');

        const dataStart = dayHeaderIdx + 2;
        const nd = JSON.parse(JSON.stringify(data));
        nd.days.forEach(d => { d.exercises = []; d.isRest = false; d.category = ''; });

        Object.values(dayCols).forEach(({ di, category }) => {
          nd.days[di].category = category;
          const raw = dayHeader.find(c => new RegExp(DAY_NAMES[di], 'i').test(c)) || '';
          if (/rest/i.test(raw)) nd.days[di].isRest = true;
        });

        Object.entries(dayCols).forEach(([colIdxStr, info]) => {
          const colIdx = parseInt(colIdxStr, 10);
          const { di } = info;
          let currentEx = null;

          for (let r = dataStart; r < rows.length; r++) {
            const row = rows[r];
            const rawName = (row[colIdx] || '').trim();
            const rawReps = (row[colIdx + 1] || '').trim();
            const rawWeight = (row[colIdx + 2] || '').trim();

            if (rawName.toUpperCase() === 'REST') {
              nd.days[di].isRest = true;
              currentEx = null;
              continue;
            }

            if (rawName) {
              const cleaned = cleanName(rawName);
              if (shouldSkipExercise(cleaned)) { currentEx = null; continue; }
              currentEx = { id: uid(), name: cleaned, sets: [], pr: [] };
              nd.days[di].exercises.push(currentEx);
            }

            if (!currentEx) continue;

            const reps = parseReps(rawReps);
            let wt = parseWeight(rawWeight);
            if (wt === null && rawReps) {
              const inParens = rawReps.match(/\(([^)]+)\)/);
              if (inParens) wt = parseWeight(inParens[1]);
            }
            if (reps === null && wt === null) continue;
            currentEx.sets.push({ id: uid(), reps: reps ?? 0, weight: wt === null ? 0 : wt });
            currentEx.pr.push(reps ?? 0);
          }

          nd.days[di].exercises = nd.days[di].exercises.filter(ex => ex.sets.length > 0);
        });

        resolve(nd);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
}
