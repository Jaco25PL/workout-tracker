export default function Stepper({ value, belowPR, onDecrement, onIncrement }) {
  return (
    <div className="stepper">
      <button className="stepper-btn" onClick={onDecrement}>−</button>
      <span className={`stepper-val ${belowPR ? 'below-pr' : ''}`}>{value}</span>
      <button className="stepper-btn" onClick={onIncrement}>+</button>
    </div>
  );
}
