import { useAuth } from '../../hooks/useAuth';
import './ProfilePage.scss';

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="profile-page">
      <h1>{user?.username}</h1>
      <p className="profile-email">Perfil completo — próximamente.</p>
      <button className="profile-logout-button" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};