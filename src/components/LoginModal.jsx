import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function LoginModal({ onClose, onToast, t }) {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'reset'

  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    setLoading(false);
    if (error) { onToast('Error: ' + error.message); return; }
    // Redirect happens automatically — modal will close on auth state change
  }

  async function handleLogin(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('email');
    const password = fd.get('password');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { onToast('Error: ' + error.message); return; }
    onClose();
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('email');
    const password = fd.get('password');
    setLoading(true);
    const name = fd.get('name');
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    setLoading(false);
    if (error) { onToast('Error: ' + error.message); return; }
    onToast(t.checkEmail);
    setTab('login');
  }

  async function handleReset(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('email');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) { onToast('Error: ' + error.message); return; }
    onToast(t.resetSent);
    setTab('login');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        {tab === 'reset' ? (
          <>
            <div className="modal-title">{t.resetPassword}</div>
            <div className="modal-sub">{t.resetSub}</div>
            <form onSubmit={handleReset}>
              <input className="modal-input" name="email" type="email" placeholder={t.email} required autoComplete="email" />
              <button className="modal-btn" type="submit" disabled={loading}>
                {loading ? t.loading : t.sendResetLink}
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-dim)' }}>
              <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => setTab('login')}>
                {t.loginTab}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="modal-title">{tab === 'login' ? t.welcomeBack : t.createAccount}</div>
            <div className="modal-sub">{tab === 'login' ? t.signIn : t.startTracking}</div>

            <button className="google-btn" onClick={handleGoogle} disabled={loading} type="button">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              {t.continueWithGoogle}
            </button>

            <div className="modal-divider-row">
              <span className="modal-divider-line" />
              <span className="modal-divider-text">{t.orDivider}</span>
              <span className="modal-divider-line" />
            </div>

            <div className="modal-tabs">
              <button className={`modal-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>{t.loginTab}</button>
              <button className={`modal-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>{t.signupTab}</button>
            </div>

            {tab === 'login' ? (
              <form onSubmit={handleLogin} key="login">
                <input className="modal-input" name="email" type="email" placeholder={t.email} required autoComplete="email" />
                <input className="modal-input" name="password" type="password" placeholder={t.password} required autoComplete="current-password" minLength={6} />
                <button className="modal-btn" type="submit" disabled={loading}>
                  {loading ? t.loading : t.loginBtn}
                </button>
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13 }}>
                  <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => setTab('reset')}>
                    {t.forgotPassword}
                  </span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUp} key="signup">
                <input className="modal-input" name="name" placeholder={t.yourName} required autoComplete="name" />
                <input className="modal-input" name="email" type="email" placeholder={t.email} required autoComplete="email" />
                <input className="modal-input" name="password" type="password" placeholder={t.password} required autoComplete="new-password" minLength={6} />
                <button className="modal-btn" type="submit" disabled={loading}>
                  {loading ? t.loading : t.signupBtn}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
