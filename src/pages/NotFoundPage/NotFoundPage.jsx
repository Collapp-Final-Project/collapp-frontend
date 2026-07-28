import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FileQuestion } from "lucide-react";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const target = isAuthenticated ? "/feed" : "/";
  const label = "Volver al inicio";

  return (
    <div className="not-found-page">
      <FileQuestion size={64} aria-hidden="true" />
      <h1>404</h1>
      <p>Página no encontrada</p>
      <span>La página que buscas no existe o ha sido movida.</span>
      <button onClick={() => navigate(target)}>{label}</button>
    </div>
  );
};
