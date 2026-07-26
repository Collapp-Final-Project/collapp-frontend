import "./SpecialtySelector.scss";

const SPECIALTIES = [
  { value: "MAKEUP", label: "SFX & Maquillaje", className: "specialty-sfx" },
  { value: "PHOTOGRAPHY_VIDEO", label: "Fotografía & Video", className: "specialty-photo" },
  { value: "MODEL_TALENT", label: "Modelo / Talento", className: "specialty-model" },
  { value: "PRODUCTION", label: "Producción", className: "specialty-prod" },
];

export const SpecialtySelector = ({ id, label, value, onChange, error }) => {
  const handleKeyDown = (e, index) => {
    const isNext = e.key === "ArrowRight" || e.key === "ArrowDown";
    const isPrev = e.key === "ArrowLeft" || e.key === "ArrowUp";

    if (!isNext && !isPrev) return;

    e.preventDefault();
    const nextIndex = isNext
      ? (index + 1) % SPECIALTIES.length
      : (index - 1 + SPECIALTIES.length) % SPECIALTIES.length;

    const nextOption = SPECIALTIES[nextIndex];
    onChange(nextOption.value);

    document.getElementById(`${id}-${nextOption.value}`)?.focus();
  };

  return (
    <div className="specialty-group">
      {label && (
        <span className="specialty-label" id={`${id}-label`}>
          {label}
        </span>
      )}
      <div
        className="specialty-options"
        role="radiogroup"
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        {SPECIALTIES.map((specialty, index) => {
          const isSelected = value === specialty.value;
          return (
            <button
              key={specialty.value}
              id={`${id}-${specialty.value}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected || (!value && index === 0) ? 0 : -1}
              className={`specialty-option ${specialty.className} ${isSelected ? "specialty-selected" : ""}`}
              onClick={() => onChange(specialty.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span className={`specialty-dot ${specialty.className}`} aria-hidden="true" />
              {specialty.label}
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