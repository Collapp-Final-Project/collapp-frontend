import { useEffect, useState } from "react";
import { LogOut, Link, Link2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { userService } from "../../services/userService";
import { AvatarPreview } from "../../components/ui/AvatarPreview/AvatarPreview";
import { CategoryBadge } from "../../components/common/offers/CategoryBadge/CategoryBadge";
import "./ProfilePage.scss";

export const ProfilePage = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await userService.getMe();
        if (!isCancelled) setProfile(data);
      } catch {
        if (!isCancelled) setError("No se pudo cargar tu perfil.");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchProfile();
    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <p role="status" aria-live="polite" className="profile-page-status">
        Cargando perfil...
      </p>
    );
  }

  if (error || !profile) {
    return (
      <p role="alert" className="profile-page-status profile-page-error">
        {error || "No se pudo cargar el perfil."}
      </p>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-page-card">
        <div className="profile-page-cover" />

        <div className="profile-page-avatar-wrapper">
          <AvatarPreview src={profile.avatarUrl} />
        </div>

        <h1>{profile.fullName}</h1>
        <CategoryBadge category={profile.specialty} />

        {profile.bio && <p className="profile-page-bio">{profile.bio}</p>}

        <div className="profile-page-links">
          {profile.instagramUrl && (
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="profile-page-link"
            >
              <Instagram size={16} aria-hidden="true" /> Redes
            </a>
          )}
          {profile.portfolioUrl && (
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="profile-page-link"
            >
              <Link2 size={16} aria-hidden="true" /> Portafolio
            </a>
          )}
        </div>
      </div>

      <button className="profile-page-logout" onClick={logout}>
        <LogOut size={18} aria-hidden="true" />
        Cerrar sesión
      </button>
    </div>
  );
};