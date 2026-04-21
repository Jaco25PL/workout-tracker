import { useState, useEffect, useRef } from 'react';
import { uid } from './utils/uid';
import { loadData, saveData } from './utils/storage';
import { exportCSV, importCSV } from './utils/csv';
import Header from './components/Header';
import DaySelector from './components/DaySelector';
import RestBanner from './components/RestBanner';
import EmptyState from './components/EmptyState';
import ExerciseCard from './components/ExerciseCard';
import MenuDrawer from './components/MenuDrawer';
import LoginModal from './components/LoginModal';
import LinkModal from './components/LinkModal';
import Toast from './components/Toast';

export default function App() {
  const today = new Date().getDay();
  const [data, setData] = useState(loadData);
  const [curDay, setCurDay] = useState(() => {
    const s = localStorage.getItem('wt_day');
    return s !== null ? parseInt(s) : today;
  });
  const [dark, setDark] = useState(() => localStorage.getItem('wt_dark') !== 'false');
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [linkModal, setLinkModal] = useState(null);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wt_user')); } catch (e) { return null; }
  });
  const [toast, setToast] = useState('');
  const [toastVis, setToastVis] = useState(false);
  const fileRef = useRef();
  const toastTmr = useRef();

  useEffect(() => { document.body.classList.toggle('light', !dark); localStorage.setItem('wt_dark', dark); }, [dark]);
  useEffect(() => { saveData(data); }, [data]);
  useEffect(() => { localStorage.setItem('wt_day', curDay); }, [curDay]);

  function showToast(msg) {
    clearTimeout(toastTmr.current);
    setToast(msg);
    setToastVis(true);
    toastTmr.current = setTimeout(() => setToastVis(false), 2200);
  }

  // Edit mode
  function openEdit() { setEditData(JSON.parse(JSON.stringify(data))); setEditMode(true); setMenuOpen(false); }
  function cancelEdit() { setEditMode(false); setEditData(null); }
  function saveEdit() { setData(editData); setEditMode(false); setEditData(null); showToast('Saved'); }

  const viewData = editMode ? editData : data;
  const viewDay = viewData.days[curDay];
  const editDay = editMode ? editData.days[curDay] : null;

  function updEditDay(fn) {
    setEditData(prev => { const n = JSON.parse(JSON.stringify(prev)); fn(n.days[curDay]); return n; });
  }

  // Update reps/weight stepper (view mode)
  function updateSet(exIdx, si, field, delta) {
    setData(prev => {
      const n = JSON.parse(JSON.stringify(prev));
      const s = n.days[curDay].exercises[exIdx].sets[si];
      s[field] = Math.max(0, parseFloat((s[field] + delta).toFixed(1)));
      if (field === 'reps') {
        const ex = n.days[curDay].exercises[exIdx];
        if (!ex.pr) ex.pr = [];
        if (ex.pr[si] === undefined || s.reps > ex.pr[si]) {
          ex.pr[si] = s.reps;
        }
      }
      return n;
    });
  }

  function resetPR(exIdx) {
    setData(prev => {
      const n = JSON.parse(JSON.stringify(prev));
      const ex = n.days[curDay].exercises[exIdx];
      ex.pr = ex.sets.map(s => s.reps);
      return n;
    });
    showToast('PR reset');
  }

  function toggleSkip(exIdx) {
    setData(prev => {
      const n = JSON.parse(JSON.stringify(prev));
      const ex = n.days[curDay].exercises[exIdx];
      ex.skipped = !ex.skipped;
      return n;
    });
  }

  function handleExport() {
    exportCSV(data);
    showToast('Exported');
    setMenuOpen(false);
  }

  function handleImportChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    importCSV(file, data)
      .then(nd => { setData(nd); showToast('Imported'); })
      .catch(err => { console.error(err); showToast('Import failed'); });
    e.target.value = '';
    setMenuOpen(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const u = { name: fd.get('name') || 'Athlete', email: fd.get('email') };
    setUser(u);
    localStorage.setItem('wt_user', JSON.stringify(u));
    setLoginOpen(false);
    setMenuOpen(false);
    showToast(`Welcome, ${u.name}`);
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('wt_user');
    setMenuOpen(false);
    showToast('Logged out');
  }

  return (
    <div className="app">
      <Header
        viewDay={viewDay}
        editMode={editMode}
        editDay={editDay}
        updEditDay={updEditDay}
        onMenuOpen={() => setMenuOpen(true)}
        onCancelEdit={cancelEdit}
        onSaveEdit={saveEdit}
      />

      <DaySelector curDay={curDay} setCurDay={setCurDay} viewData={viewData} />

      {/* Rest toggle in edit */}
      {editMode && (
        <div className="rest-toggle-row">
          <div>
            <div className="rest-toggle-label">Rest Day</div>
            <div className="rest-toggle-sub">No exercises scheduled</div>
          </div>
          <div className={`toggle ${editDay.isRest ? 'on' : ''}`} onClick={() => updEditDay(d => { d.isRest = !d.isRest; })} />
        </div>
      )}

      {/* Rest banner */}
      {viewDay.isRest && !editMode && <RestBanner />}

      {/* Exercises */}
      {(!viewDay.isRest || editMode) && (
        <div className="exercises">
          {viewDay.exercises.length === 0 && !editMode && <EmptyState />}

          {viewDay.exercises.map((ex, exIdx) => (
            <ExerciseCard
              key={ex.id}
              ex={ex}
              exIdx={exIdx}
              editMode={editMode}
              editDay={editDay}
              updEditDay={updEditDay}
              updateSet={updateSet}
              resetPR={resetPR}
              toggleSkip={toggleSkip}
              onOpenLink={(idx) => setLinkModal({ exIdx: idx, value: editDay.exercises[idx].link || '' })}
            />
          ))}

          {editMode && (
            <button className="add-ex-btn" onClick={() => updEditDay(d => {
              d.exercises.push({ id: uid(), name: '', pr: [10], sets: [{ id: uid(), reps: 10, weight: 0 }] });
            })}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Exercise
            </button>
          )}
        </div>
      )}

      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
        onEdit={openEdit}
        onImport={() => fileRef.current.click()}
        onExport={handleExport}
        onLogin={() => setLoginOpen(true)}
        onLogout={handleLogout}
      />

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onLogin={handleLogin} />}

      {linkModal && (
        <LinkModal
          linkModal={linkModal}
          setLinkModal={setLinkModal}
          editData={editData}
          curDay={curDay}
          updEditDay={updEditDay}
        />
      )}

      <input type="file" ref={fileRef} accept=".csv" onChange={handleImportChange} />
      <Toast message={toast} visible={toastVis} />
    </div>
  );
}
