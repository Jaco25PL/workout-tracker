export default function Stepper({ value, belowPR, onDecrement, onIncrement, onResetPR }) {
  return (
    <div className="stepper">
      <button className="stepper-btn" onClick={onDecrement}>−</button>
      <span
        className={`stepper-val ${belowPR ? 'below-pr' : ''}`}
        onClick={onResetPR}
        style={onResetPR ? { cursor: 'pointer', position: 'relative' } : undefined}
      >
        {belowPR ? <span className="pr-reset-hint">{value}</span> : value}
      </span>
      <button className="stepper-btn" onClick={onIncrement}>+</button>
    </div>
  );
}
