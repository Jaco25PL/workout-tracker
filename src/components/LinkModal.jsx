export default function LinkModal({ linkModal, setLinkModal, editData, curDay, updEditDay }) {
  const hasExistingLink = editData && editData.days[curDay].exercises[linkModal.exIdx]?.link;

  return (
    <div className="modal-overlay" onClick={() => setLinkModal(null)}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setLinkModal(null)}>×</button>
        <div className="modal-title">Exercise link</div>
        <div className="modal-sub">Paste a URL (video, guide, etc). The exercise name will open it.</div>
        <input
          className="modal-input"
          value={linkModal.value}
          onChange={e => setLinkModal({ ...linkModal, value: e.target.value })}
          placeholder="https://..."
          autoFocus
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          {hasExistingLink && (
            <button
              style={{ flex: 1, padding: 15, borderRadius: 14, background: 'var(--red-dim)', border: '1px solid oklch(0.68 0.22 25 / 0.2)', color: 'var(--red)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
              onClick={() => {
                updEditDay(d => { delete d.exercises[linkModal.exIdx].link; });
                setLinkModal(null);
              }}
            >Remove</button>
          )}
          <button
            className="modal-btn"
            style={{ flex: hasExistingLink ? 2 : 1, marginTop: 0 }}
            onClick={() => {
              const url = linkModal.value.trim();
              updEditDay(d => {
                if (url) d.exercises[linkModal.exIdx].link = url;
                else delete d.exercises[linkModal.exIdx].link;
              });
              setLinkModal(null);
            }}
          >Save</button>
        </div>
      </div>
    </div>
  );
}
