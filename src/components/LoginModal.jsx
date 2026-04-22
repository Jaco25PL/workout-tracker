import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function LoginModal({ onClose, onToast, t }) {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'reset'

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
    const { error } = await supabase.auth.signUp({ email, password });
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
