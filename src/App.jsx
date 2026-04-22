import { useState, useEffect, useRef, useCallback } from 'react';
import { uid } from './utils/uid';
import { loadData, saveData, pullData, pushData } from './utils/storage';
import { supabase } from './utils/supabase';
import { exportCSV, importCSV } from './utils/csv';
import { T } from './translations';
import Header from './components/Header';
import DaySelector from './components/DaySelector';
import RestBanner from './components/RestBanner';
import EmptyState from './components/EmptyState';
import ExerciseCard from './components/ExerciseCard';
import MenuDrawer from './components/MenuDrawer';
import LoginModal from './components/LoginModal';
import NewPasswordModal from './components/NewPasswordModal';
import LinkModal from './components/LinkModal';
import Toast from './components/Toast';
import CatPopup from './components/CatPopup';

export default function App() {
  const today = new Date().getDay();
  const [data, setData] = useState(loadData);
  const [curDay, setCurDay] = useState(today);
  const [dark, setDark] = useState(() => localStorage.getItem('wt_dark') !== 'false');
  const [lang, setLang] = useState(() => localStorage.getItem('wt_lang') || 'en');
  const t = T[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [linkModal, setLinkModal] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState('');
  const [toastVis, setToastVis] = useState(false);
  const [catAnim, setCatAnim] = useState(null);
  const [newPasswordOpen, setNewPasswordOpen] = useState(false);
  const fileRef = useRef();
  const toastTmr = useRef();
  const syncTmr = useRef();
  const catTimer = useRef();

  // Auth state listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) syncFromCloud(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        syncFromCloud(session.user.id);
        if (event === 'SIGNED_IN') {
          const name = session.user.user_metadata?.name || session.user.email.split('@')[0];
          showToast(T[localStorage.getItem('wt_lang') || 'en'].welcomeMsg(name));
        }
        if (event === 'PASSWORD_RECOVERY') {
          setNewPasswordOpen(true);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Pull from cloud on login
  async function syncFromCloud(userId) {
    try {
      const cloud = await pullData(userId);
      if (cloud) {
        setData(cloud);
        saveData(cloud);
      } else {
        // First login — push local data to cloud
        const local = loadData();
        await pushData(userId, local);
      }
    } catch (e) { console.error('Sync pull failed:', e); }
  }

  // Save locally + push to cloud (debounced)
  const syncToCloud = useCallback((d) => {
    saveData(d);
    clearTimeout(syncTmr.current);
    syncTmr.current = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        try { await pushData(session.user.id, d); }
        catch (e) { console.error('Sync push failed:', e); }
      }
    }, 1500);
  }, []);

  useEffect(() => { document.body.classList.toggle('light', !dark); localStorage.setItem('wt_dark', dark); }, [dark]);
  useEffect(() => { localStorage.setItem('wt_lang', lang); }, [lang]);
  useEffect(() => { syncToCloud(data); }, [data, syncToCloud]);

  function showToast(msg) {
    clearTimeout(toastTmr.current);
    setToast(msg);
    setToastVis(true);
    toastTmr.current = setTimeout(() => setToastVis(false), 2200);
  }

  function showCat(type) {
    if (dark) return; // pink mode only
    clearTimeout(catTimer.current);
    setCatAnim({ type, key: Math.floor(Math.random() * 5) });
    catTimer.current = setTimeout(() => setCatAnim(null), 1600);
  }

  // Edit mode
  function openEdit() { setEditData(JSON.parse(JSON.stringify(data))); setEditMode(true); setMenuOpen(false); }
  function cancelEdit() { setEditMode(false); setEditData(null); }
  function saveEdit() { setData(editData); setEditMode(false); setEditData(null); showToast(t.saved); }

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
    showCat(delta > 0 ? 'happy' : 'sad');
  }

  function resetPR(exIdx) {
    setData(prev => {
      const n = JSON.parse(JSON.stringify(prev));
      const ex = n.days[curDay].exercises[exIdx];
      ex.pr = ex.sets.map(s => s.reps);
      return n;
    });
    showToast(t.prUpdated);
  }

  function resetSetPR(exIdx, si) {
    setData(prev => {
      const n = JSON.parse(JSON.stringify(prev));
      const ex = n.days[curDay].exercises[exIdx];
      if (!ex.pr) ex.pr = [];
      ex.pr[si] = ex.sets[si].reps;
      return n;
    });
    showToast(t.prUpdated);
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
    showToast(t.exported);
    setMenuOpen(false);
  }

  function handleImportChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    importCSV(file, data)
      .then(nd => { setData(nd); showToast(t.imported); })
      .catch(err => { console.error(err); showToast(t.importFailed); });
    e.target.value = '';
    setMenuOpen(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    showToast(t.loggedOut);
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
        t={t}
        curDay={curDay}
      />

      <DaySelector curDay={curDay} setCurDay={setCurDay} viewData={viewData} t={t} />

      {/* Rest toggle in edit */}
      {editMode && (
        <div className="rest-toggle-row">
          <div>
            <div className="rest-toggle-label">{t.restDayToggle}</div>
            <div className="rest-toggle-sub">{t.restDayToggleSub}</div>
          </div>
          <div className={`toggle ${editDay.isRest ? 'on' : ''}`} onClick={() => updEditDay(d => { d.isRest = !d.isRest; })} />
        </div>
      )}

      {/* Rest banner */}
      {viewDay.isRest && !editMode && <RestBanner t={t} />}

      {/* Exercises */}
      {(!viewDay.isRest || editMode) && (
        <div className="exercises">
          {viewDay.exercises.length === 0 && !editMode && <EmptyState t={t} />}

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
              resetSetPR={resetSetPR}
              toggleSkip={toggleSkip}
              onOpenLink={(idx) => setLinkModal({ exIdx: idx, value: editDay.exercises[idx].link || '' })}
              t={t}
            />
          ))}

          {editMode && (
            <button className="add-ex-btn" onClick={() => updEditDay(d => {
              d.exercises.push({ id: uid(), name: '', pr: [10], sets: [{ id: uid(), reps: 10, weight: 0 }] });
            })}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> {t.addExercise.replace('+ ', '')}
            </button>
          )}
        </div>
      )}

      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        dark={dark}
        lang={lang}
        t={t}
        onToggleDark={() => setDark(d => !d)}
        onToggleLang={() => setLang(l => l === 'en' ? 'es' : 'en')}
        onEdit={openEdit}
        onImport={() => fileRef.current.click()}
        onExport={handleExport}
        onLogin={() => setLoginOpen(true)}
        onLogout={handleLogout}
      />

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onToast={showToast} t={t} />}
      {newPasswordOpen && <NewPasswordModal onClose={() => setNewPasswordOpen(false)} onToast={showToast} t={t} />}

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
      {!dark && <CatPopup catAnim={catAnim} lang={lang} />}
    </div>
  );
}
