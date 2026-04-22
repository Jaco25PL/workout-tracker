export default function EmptyState({ t }) {
  return (
    <div className="empty-state">
      <span className="empty-emoji">💪</span>
      <div className="empty-title">{t.noExercises}</div>
      <div className="empty-sub">{t.noExercisesSub}</div>
    </div>
  );
}
