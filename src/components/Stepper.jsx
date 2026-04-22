export default function Stepper({ value, belowPR, onDecrement, onIncrement, onResetPR }) {
  return (
    <div className="stepper">
      <button className="stepper-btn" onClick={onDecrement}>−</button>
      <span
        className={`stepper-val ${belowPR ? 'below-pr' : ''}`}
        onClick={onResetPR}
        style={onResetPR ? { cursor: 'pointer' } : undefined}
      >
        {value}
        {onResetPR && <span className="pr-reset-arrow">↺</span>}
      </span>
      <button className="stepper-btn" onClick={onIncrement}>+</button>
    </div>
  );
}
