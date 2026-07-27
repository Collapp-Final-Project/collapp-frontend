import "./TextareaInput.scss";

export const TextareaInput = ({
  id,
  label,
  icon: Icon,
  error,
  ...textareaProps
}) => (
  <div className="textarea-input-group">
    <label htmlFor={id}>{label}</label>
    <div className={`textarea-input-wrapper ${error ? "textarea-input-error" : ""}`}>
      {Icon && <Icon className="textarea-input-icon" size={20} aria-hidden="true" />}
      <textarea
        id={id}
        rows={3}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...textareaProps}
      />
    </div>
    {error && (
      <span id={`${id}-error`} className="textarea-error-message" role="alert">
        {error}
      </span>
    )}
  </div>
);
