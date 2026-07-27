import "./TextareaInput.scss";

export const TextareaInput = ({
  id,
  label,
  icon: Icon,
  error,
  ...textareaProps
}) => (
  <div className="auth-input-group">
    <label htmlFor={id}>{label}</label>
    <div className={`auth-input-wrapper ${error ? "auth-input-error" : ""}`}>
      {Icon && <Icon className="auth-input-icon" size={20} aria-hidden="true" />}
      <textarea
        id={id}
        rows={3}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...textareaProps}
      />
    </div>
    {error && (
      <span id={`${id}-error`} className="auth-error-message" role="alert">
        {error}
      </span>
    )}
  </div>
);
