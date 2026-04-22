export default function Header({ viewDay, editMode, editDay, updEditDay, onMenuOpen, onCancelEdit, onSaveEdit, t, curDay }) {
  return (
    <div className="header">
      <div className="header-top">
        <div className="header-left">
          {editMode ? (
            <input
              className="cat-edit-input"
              value={editDay.category}
              onChange={e => updEditDay(d => { d.category = e.target.value.toUpperCase(); })}
              placeholder={t.category}
            />
          ) : (
            <div className={`cat-label ${!viewDay.category ? 'cat-label-empty' : ''}`}>
              {viewDay.category || t.dayNames[curDay]}
            </div>
          )}
          <div className="day-sub">{t.dayNames[curDay]}</div>
        </div>

        {!editMode ? (
          <button className="menu-btn" onClick={onMenuOpen}>
            <span /><span /><span />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button onClick={onCancelEdit} style={{ padding: '8px 14px', borderRadius: 10, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{t.cancel}</button>
            <button onClick={onSaveEdit} style={{ padding: '8px 14px', borderRadius: 10, background: 'var(--accent)', border: 'none', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{t.save}</button>
          </div>
        )}
      </div>
    </div>
  );
}
