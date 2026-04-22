import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function NewPasswordModal({ onClose, onToast, t }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const password = fd.get('password');
    const confirm = fd.get('confirm');

    if (password !== confirm) {
      onToast(t.passwordMismatch);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      onToast('Error: ' + error.message);
      return;
    }

    onToast(t.passwordUpdated);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-title">{t.newPassword}</div>
        <div className="modal-sub">{t.newPasswordSub}</div>
        <form onSubmit={handleSubmit}>
          <input className="modal-input" name="password" type="password" placeholder={t.newPasswordPlaceholder} required autoComplete="new-password" minLength={6} />
          <input className="modal-input" name="confirm" type="password" placeholder={t.confirmPasswordPlaceholder} required autoComplete="new-password" minLength={6} />
          <button className="modal-btn" type="submit" disabled={loading}>
            {loading ? t.loading : t.updatePassword}
          </button>
        </form>
      </div>
    </div>
  );
}
