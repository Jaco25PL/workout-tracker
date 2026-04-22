export default function MenuDrawer({ open, onClose, user, dark, lang, t, onToggleDark, onToggleLang, onEdit, onImport, onExport, onLogin, onLogout }) {
  return (
    <>
      <div className={`menu-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`menu-drawer ${open ? 'open' : ''}`}>
        <div className="menu-handle" />
        <div className="menu-header">
          <div className="menu-title">{t.menu}</div>
          {user ? (
            <div className="menu-user" style={{ marginTop: 12 }}>
              <div className="menu-avatar">{user.email[0].toUpperCase()}</div>
              <div>
                <div className="menu-user-name">{user.email}</div>
                <div className="menu-user-sub">{t.synced}</div>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-dim)' }}>{t.notLoggedIn}</div>
          )}
        </div>

        <div className="menu-items">
          <div className="menu-section-label">{t.appearance}</div>
          <div className="menu-item" onClick={onToggleDark}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>{dark ? '\ud83c\udf19' : '\ud83c\udf38'}</div>
            <div className="menu-item-text">
              <div className="menu-item-label">{dark ? t.darkMode : t.pinkMode}</div>
              <div className="menu-item-sub">{dark ? t.switchToPink : t.switchToDark}</div>
            </div>
            <div className={`toggle ${dark ? 'on' : ''}`} onClick={e => { e.stopPropagation(); onToggleDark(); }} />
          </div>
          <div className="menu-item" onClick={onToggleLang}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>{lang === 'en' ? '\ud83c\uddea\ud83c\uddf8' : '\ud83c\uddec\ud83c\udde7'}</div>
            <div className="menu-item-text">
              <div className="menu-item-label">{t.language}</div>
              <div className="menu-item-sub">{t.langSub}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', background: 'var(--surface2)', borderRadius: 6, padding: '3px 8px' }}>{lang === 'en' ? 'EN' : 'ES'}</div>
          </div>

          <div className="menu-divider" />
          <div className="menu-section-label">{t.workout}</div>

          <div className="menu-item" onClick={onEdit}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>{'\u270f\ufe0f'}</div>
            <div className="menu-item-text">
              <div className="menu-item-label">{t.editMode}</div>
              <div className="menu-item-sub">{t.editModeSub}</div>
            </div>
            <span className="menu-item-arrow">{'\u203a'}</span>
          </div>

          <div className="menu-item" onClick={onImport}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>{'\ud83d\udce5'}</div>
            <div className="menu-item-text">
              <div className="menu-item-label">{t.importCSV}</div>
              <div className="menu-item-sub">{t.importSub}</div>
            </div>
            <span className="menu-item-arrow">{'\u203a'}</span>
          </div>

          <div className="menu-item" onClick={onExport}>
            <div className="menu-icon" style={{ background: 'var(--surface2)' }}>{'\ud83d\udce4'}</div>
            <div className="menu-item-text">
              <div className="menu-item-label">{t.exportCSV}</div>
              <div className="menu-item-sub">{t.exportSub}</div>
            </div>
            <span className="menu-item-arrow">{'\u203a'}</span>
          </div>

          <div className="menu-divider" />
          <div className="menu-section-label">{t.account}</div>

          {!user && (
            <div className="menu-item" onClick={onLogin}>
              <div className="menu-icon" style={{ background: 'var(--accent-dim)' }}>{'\ud83d\udc64'}</div>
              <div className="menu-item-text">
                <div className="menu-item-label">{t.logIn}</div>
                <div className="menu-item-sub">{t.logInSub}</div>
              </div>
              <span className="menu-item-arrow">{'\u203a'}</span>
            </div>
          )}
        </div>

        {user && (
          <div className="menu-bottom">
            <button className="menu-logout-btn" onClick={onLogout}>{t.logOut}</button>
          </div>
        )}
      </div>
    </>
  );
}
