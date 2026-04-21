export default function MenuDrawer({ open, onClose, user, dark, onToggleDark, onEdit, onImport, onExport, onLogin, onLogout }) {
  return (
    <>
      <div className={`menu-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`menu-drawer ${open ? 'open' : ''}`}>
        <div className="menu-handle" />
        <div className="menu-header">
          <div className="menu-title">Workout Tracker</div>
          {user ? (
            <div className="menu-user" style={{ marginTop: 12 }}>
              <div className="menu-avatar">{user.name[0].toUpperCase()}</div>
              <div>
                <div className="menu-user-name">{user.name}</div>
                <div className="menu-user-sub">{user.email}</div>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-dim)' }}>Not logged in</div>
          )}
        </div>

        <div className="menu-items">
          <div className="menu-section-label">Appearance</div>
          <div className="menu-item" onClick={onToggleDark}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>{dark ? '🌙' : '🌸'}</div>
            <div className="menu-item-text">
              <div className="menu-item-label">{dark ? 'Dark Mode' : 'Pink Mode'}</div>
              <div className="menu-item-sub">{dark ? 'Switch to pink' : 'Switch to dark'}</div>
            </div>
            <div className={`toggle ${dark ? 'on' : ''}`} onClick={e => { e.stopPropagation(); onToggleDark(); }} />
          </div>

          <div className="menu-divider" />
          <div className="menu-section-label">Workout</div>

          <div className="menu-item" onClick={onEdit}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>✏️</div>
            <div className="menu-item-text">
              <div className="menu-item-label">Edit Mode</div>
              <div className="menu-item-sub">Add or remove exercises</div>
            </div>
            <span className="menu-item-arrow">›</span>
          </div>

          <div className="menu-item" onClick={onImport}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>📥</div>
            <div className="menu-item-text">
              <div className="menu-item-label">Import CSV</div>
              <div className="menu-item-sub">Load workout from file</div>
            </div>
            <span className="menu-item-arrow">›</span>
          </div>

          <div className="menu-item" onClick={onExport}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>📤</div>
            <div className="menu-item-text">
              <div className="menu-item-label">Export CSV</div>
              <div className="menu-item-sub">Save all workout data</div>
            </div>
            <span className="menu-item-arrow">›</span>
          </div>

          <div className="menu-divider" />
          <div className="menu-section-label">Account</div>

          {!user && (
            <div className="menu-item" onClick={onLogin}>
              <div className="menu-icon" style={{ background: 'var(--accent-dim)' }}>👤</div>
              <div className="menu-item-text">
                <div className="menu-item-label">Log In</div>
                <div className="menu-item-sub">Sync your workouts</div>
              </div>
              <span className="menu-item-arrow">›</span>
            </div>
          )}
        </div>

        {user && (
          <div className="menu-bottom">
            <button className="menu-logout-btn" onClick={onLogout}>Log Out</button>
          </div>
        )}
      </div>
    </>
  );
}
