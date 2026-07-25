import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { FormInput } from '../FormInput/FormInput';
import './PasswordInput.scss';

export const PasswordInput = ({ id, label, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      icon={Lock}
      rightElement={
        <button
          type="button"
          className="auth-eye-button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
        </button>
      }
      {...rest}
    />
  );
};