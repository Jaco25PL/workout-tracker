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
          <div style={{ width: 40, height: 40, marginTop: 4, flexShrink: 0 }} />
        )}
      </div>
    </div>
  );
}
