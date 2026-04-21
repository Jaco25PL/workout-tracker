export default function EmptyState() {
  return (
    <div className="empty-state">
      <span className="empty-emoji">💪</span>
      <div className="empty-title">No exercises yet</div>
      <div className="empty-sub">Open the menu to import a CSV<br />or tap Edit to build your workout</div>
    </div>
  );
}
