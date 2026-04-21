import { uid } from '../utils/uid';
import { fmtW } from '../utils/formatters';
import Stepper from './Stepper';

export default function ExerciseCard({ ex, exIdx, editMode, editDay, updEditDay, updateSet, resetPR, toggleSkip, onOpenLink }) {
  const pr = ex.pr || [];
  const hasBelowPR = !editMode && !ex.skipped && ex.sets.some((s, si) => pr[si] !== undefined && s.reps < pr[si]);
  const isSkipped = !!ex.skipped;

  return (
    <div className={`exercise-card ${isSkipped ? 'skipped' : ''}`}>
      {/* Card header row */}
      <div className="exercise-card-header">
        {editMode ? (
          <>
            <input
              className="edit-input"
              value={editDay.exercises[exIdx].name}
              onChange={e => updEditDay(d => { d.exercises[exIdx].name = e.target.value; })}
              placeholder="Exercise name"
            />
            <button
              className={`link-btn ${editDay.exercises[exIdx].link ? 'has-link' : ''}`}
              onClick={() => onOpenLink(exIdx)}
              title={editDay.exercises[exIdx].link ? 'Edit link' : 'Add link'}
            >
              {editDay.exercises[exIdx].link ? '🔗' : '+'}
            </button>
          </>
        ) : (
          ex.link ? (
            <a className="exercise-name exercise-name-link" href={ex.link} target="_blank" rel="noopener noreferrer">{ex.name}</a>
          ) : (
            <div className="exercise-name">{ex.name}</div>
          )
        )}
        {!editMode && (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {hasBelowPR && (
              <button className="reset-pr-btn" onClick={() => resetPR(exIdx)}>Reset PR</button>
            )}
            <button
              className={`skip-btn ${isSkipped ? 'skipped' : ''}`}
              onClick={() => toggleSkip(exIdx)}
              title={isSkipped ? 'Unskip exercise' : 'Skip exercise'}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <line x1="2" y1="11" x2="11" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {editMode && editDay.exercises[exIdx].link && (
        <div className="link-url-row">{editDay.exercises[exIdx].link}</div>
      )}

      <div className="sets-header">
        <span>#</span><span>Reps</span><span>Weight</span>
        {editMode && <span />}
      </div>

      {ex.sets.map((s, si) => {
        const isBelowPR = !editMode && pr[si] !== undefined && s.reps < pr[si];
        return editMode ? (
          <div key={s.id} className="edit-set-row">
            <span className="set-num">{si + 1}</span>
            <input className="edit-set-input" value={editDay.exercises[exIdx].sets[si].reps}
              onChange={e => updEditDay(d => { d.exercises[exIdx].sets[si].reps = parseInt(e.target.value) || 0; })}
              type="number" inputMode="numeric" min="0" />
            <input className="edit-set-input" value={editDay.exercises[exIdx].sets[si].weight}
              onChange={e => updEditDay(d => { d.exercises[exIdx].sets[si].weight = parseFloat(e.target.value) || 0; })}
              type="number" inputMode="decimal" min="0" step="0.5" />
            <button className="del-btn" onClick={() => updEditDay(d => { d.exercises[exIdx].sets.splice(si, 1); })}>×</button>
          </div>
        ) : (
          <div key={s.id} className="set-row">
            <span className="set-num">{si + 1}</span>
            <Stepper
              value={s.reps}
              belowPR={isBelowPR}
              onDecrement={() => updateSet(exIdx, si, 'reps', -1)}
              onIncrement={() => updateSet(exIdx, si, 'reps', 1)}
            />
            <Stepper
              value={fmtW(s.weight)}
              belowPR={false}
              onDecrement={() => updateSet(exIdx, si, 'weight', -0.5)}
              onIncrement={() => updateSet(exIdx, si, 'weight', 0.5)}
            />
          </div>
        );
      })}

      {editMode && (
        <>
          <button className="add-set-btn" onClick={() => updEditDay(d => {
            const last = d.exercises[exIdx].sets.slice(-1)[0];
            d.exercises[exIdx].sets.push({ id: uid(), reps: last?.reps || 10, weight: last?.weight || 0 });
          })}>+ Add Set</button>
          <button className="remove-ex-btn" onClick={() => updEditDay(d => { d.exercises.splice(exIdx, 1); })}>× Remove Exercise</button>
        </>
      )}
    </div>
  );
}
