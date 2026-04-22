export default function RestBanner({ t }) {
  return (
    <div className="rest-banner">
      <span className="rest-banner-emoji">😴</span>
      <div className="rest-banner-text">{t.restDay}</div>
      <div className="rest-banner-sub">{t.restSub}</div>
    </div>
  );
}
