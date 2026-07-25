import { useAuth } from '../../hooks/useAuth';

export const FeedPage = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '32px', textAlign: 'center' }}>
      <h1>¡Bienvenido, {user?.username}!</h1>
      <p>El tablón de ofertas llegará en la Épica 6.</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};