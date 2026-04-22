import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function LoginModal({ onClose, onToast }) {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('email');
    const password = fd.get('password');
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) { onToast('Error: ' + error.message); return; }
      onToast('Check your email to confirm, then log in!');
      setIsSignUp(false);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) { onToast('Error: ' + error.message); return; }
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-title">{isSignUp ? 'Create account' : 'Welcome back'}</div>
        <div className="modal-sub">{isSignUp ? 'Sign up to sync your workouts' : 'Log in to sync your workouts'}</div>
        <form onSubmit={handleSubmit}>
          <input className="modal-input" name="email" type="email" placeholder="Email address" required autoComplete="email" />
          <input className="modal-input" name="password" type="password" placeholder="Password" required autoComplete={isSignUp ? 'new-password' : 'current-password'} minLength={6} />
          <button className="modal-btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-dim)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </span>
        </div>
      </div>
    </div>
  );
}
