import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail } from 'lucide-react';
import { AuthCard } from '../../components/common/auth/AuthCard/AuthCard';
import { AuthFooter } from '../../components/common/auth/AuthFooter/AuthFooter';
import { FormInput } from '../../components/ui/FormInput/FormInput';
import { PasswordInput } from '../../components/ui/PasswordInput/PasswordInput';
import { SubmitButton } from '../../components/ui/SubmitButton/SubmitButton';
import './LoginPage.scss';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/feed');
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Email o contraseña incorrectos'
          : 'Ocurrió un error inesperado. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Collapp"
      subtitle="Únete a la comunidad creativa."
      footer={<AuthFooter prompt="¿No tienes cuenta?" linkText="Crear Cuenta" to="/register" />}
    >
      <form onSubmit={handleSubmit} className="login-form">
        <FormInput
          id="email"
          type="email"
          label="Email"
          icon={Mail}
          placeholder="collapp@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          autoComplete="current-password"
          required
        />
        <SubmitButton isLoading={isLoading} loadingText="Iniciando sesión...">
          Iniciar sesión
        </SubmitButton>
      </form>
    </AuthCard>
  );
};