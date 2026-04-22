export default function DaySelector({ curDay, setCurDay, viewData, t }) {
  return (
    <div className="day-selector">
      {t.days.map((d, i) => (
        <button
          key={i}
          className={`day-pill ${curDay === i ? 'active' : ''} ${viewData.days[i].isRest ? 'rest' : ''}`}
          onClick={() => setCurDay(i)}
        >{d}</button>
      ))}
    </div>
  );
}
