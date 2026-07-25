import { Banknote, Handshake } from 'lucide-react';
import './CompensationSelector.scss';

const OPTIONS = [
  { value: 'PAID', label: 'Remunerado', icon: Banknote },
  { value: 'COLLABORATION', label: 'Colaboración', icon: Handshake },
];

export const CompensationSelector = ({ id, label, value, onChange, error }) => {
  const handleKeyDown = (e, index) => {
    const isNext = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const isPrev = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!isNext && !isPrev) return;

    e.preventDefault();
    const nextIndex = isNext
      ? (index + 1) % OPTIONS.length
      : (index - 1 + OPTIONS.length) % OPTIONS.length;

    const nextOption = OPTIONS[nextIndex];
    onChange(nextOption.value);
    document.getElementById(`${id}-${nextOption.value}`)?.focus();
  };

  return (
    <div className="compensation-group">
      {label && (
        <span className="compensation-label" id={`${id}-label`}>
          {label}
        </span>
      )}
      <div
        className="compensation-options"
        role="radiogroup"
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        {OPTIONS.map((option, index) => {
          const isSelected = value === option.value;
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              id={`${id}-${option.value}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected || (!value && index === 0) ? 0 : -1}
              className={`compensation-option ${isSelected ? 'compensation-selected' : ''}`}
              onClick={() => onChange(option.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <Icon size={18} aria-hidden="true" />
              {option.label}
            </button>
          );
        })}
      </div>
      {error && (
        <span id={`${id}-error`} className="auth-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};