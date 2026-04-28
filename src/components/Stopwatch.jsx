import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function loadSW() {
  try {
    const s = localStorage.getItem('wt_sw');
    if (s) return JSON.parse(s);
  } catch (e) { /* ignore */ }
  return null;
}

function saveSW(running, base, startedAt, laps) {
  try {
    localStorage.setItem('wt_sw', JSON.stringify({ running, base, startedAt, laps }));
  } catch (e) { /* ignore */ }
}

function clearSW() {
  try { localStorage.removeItem('wt_sw'); } catch (e) { /* ignore */ }
}

export default function Stopwatch({ t, hidden }) {
  const saved = useRef(loadSW());
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(() => saved.current?.running || false);
  const [ms, setMs] = useState(() => {
    const s = saved.current;
    if (!s) return 0;
    if (s.running) return s.base + (Date.now() - s.startedAt);
    return s.base;
  });
  const [laps, setLaps] = useState(() => saved.current?.laps || []);
  const startRef = useRef(saved.current?.running ? saved.current.startedAt : 0);
  const baseRef = useRef(saved.current?.base || 0);
  const intRef = useRef();

  useEffect(() => {
    if (running) {
      startRef.current = startRef.current || Date.now();
      intRef.current = setInterval(() => setMs(baseRef.current + Date.now() - startRef.current), 40);
      saveSW(true, baseRef.current, startRef.current, laps);
    } else {
      clearInterval(intRef.current);
      baseRef.current = ms;
      if (ms > 0) saveSW(false, baseRef.current, 0, laps);
    }
    return () => clearInterval(intRef.current);
  }, [running]);

  function fmt(v) {
    const tot = Math.floor(v / 1000), m = Math.floor(tot / 60), s = tot % 60, c = Math.floor((v % 1000) / 10);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(c).padStart(2, '0')}`;
  }

  function handleReset() {
    setRunning(false); setMs(0); baseRef.current = 0; startRef.current = 0; setLaps([]);
    clearSW();
  }

  function handleLap() {
    setLaps(p => {
      const next = [{ n: p.length + 1, v: ms }, ...p];
      saveSW(running, baseRef.current, startRef.current, next);
      return next;
    });
  }

  function handleToggle() {
    setRunning(r => {
      if (r) {
        // stopping
        return false;
      } else {
        // starting
        startRef.current = Date.now();
        return true;
      }
    });
  }

  return (
    <div className="island-wrap" style={hidden ? { display: 'none' } : undefined}>
      <motion.div
        className={`island ${open ? 'expanded' : 'collapsed'}`}
        layout
        style={{ transformOrigin: 'top', originX: 0.5, originY: 0 }}
        transition={{
          layout: {
            type: 'spring',
            stiffness: 130,
            damping: 15,
            duration: 0.3,
          },
        }}
        onClick={() => !open && setOpen(true)}
      >
        {/* Collapsed: just inline content, no wrapper needed */}
        {!open && (
          <motion.div
            className="island-collapsed-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25, delay: 0.1 } }}
          >
            <div className={`island-dot ${running ? 'active' : ''}`} />
            {ms > 0 ? <span className="island-time-small">{fmt(ms)}</span> : <span className="island-label">{t.sw}</span>}
          </motion.div>
        )}

        {/* Expanded: fades in with delay while container morphs */}
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
            onClick={e => { e.stopPropagation(); setOpen(false); }}
          >
            <div className="island-top-row" onClick={e => e.stopPropagation()}>
              <span className="island-section-label">{t.sw}</span>
              <button className="island-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="island-expanded-time">{fmt(ms)}</div>
            <div className="island-btns" onClick={e => e.stopPropagation()}>
              {(ms > 0 && !running)
                ? <button className="island-btn rst" onClick={handleReset}>{t.reset}</button>
                : <button className="island-btn lap" disabled={!running} onClick={handleLap}>{t.lap}</button>
              }
              <button className={`island-btn ${running ? 'stop' : 'go'}`} onClick={handleToggle}>
                {running ? (t.stop || 'Stop') : t.start}
              </button>
            </div>
            {laps.length > 0 && (
              <div className="island-laps" onClick={e => e.stopPropagation()}>
                {laps.map(l => (
                  <div key={l.n} className="island-lap"><span>Lap {l.n}</span><span>{fmt(l.v)}</span></div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
