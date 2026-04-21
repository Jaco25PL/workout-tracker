import { DAYS } from '../constants';

export default function DaySelector({ curDay, setCurDay, viewData }) {
  return (
    <div className="day-selector">
      {DAYS.map((d, i) => (
        <button
          key={i}
          className={`day-pill ${curDay === i ? 'active' : ''} ${viewData.days[i].isRest ? 'rest' : ''}`}
          onClick={() => setCurDay(i)}
        >{d}</button>
      ))}
    </div>
  );
}
