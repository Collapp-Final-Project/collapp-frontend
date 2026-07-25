import './FormInput.scss';


export const FormInput = ({
  id,
  type = 'text',
  label,
  icon: Icon,
  error,
  rightElement,
  ...inputProps
}) => (
  <div className="auth-input-group">
    <label htmlFor={id}>{label}</label>
    <div className={`auth-input-wrapper ${error ? 'auth-input-error' : ''}`}>
      {Icon && <Icon className="auth-input-icon" size={20} aria-hidden="true" />}
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {rightElement}
    </div>
    {error && (
      <span id={`${id}-error`} className="auth-error-message" role="alert">
        {error}
      </span>
    )}
  </div>
);