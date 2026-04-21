export default function LoginModal({ onClose, onLogin }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-title">Welcome back</div>
        <div className="modal-sub">Log in to sync your workouts</div>
        <form onSubmit={onLogin}>
          <input className="modal-input" name="name" placeholder="Your name" required autoComplete="off" />
          <input className="modal-input" name="email" type="email" placeholder="Email address" required autoComplete="off" />
          <button className="modal-btn" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
