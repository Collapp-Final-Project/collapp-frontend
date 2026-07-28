import { Link } from "react-router-dom";
import "./LandingPage.scss";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-brand">
        <h1 className="landing-page-title">Collapp</h1>

        <h2 className="landing-page-heading">Conecta, crea, colabora</h2>
        <p className="landing-page-tagline">
          Crea tu perfil profesional y conecta con oportunidades únicas en el
          ecosistema creativo.
        </p>

        <div className="landing-page-actions">
          <Link to="/register" className="landing-page-cta-primary">
            Crear cuenta
          </Link>
          <Link to="/login" className="landing-page-cta-secondary">
            Iniciar sesión
          </Link>
        </div>

        <Link to="/feed" className="landing-page-explore">
          Explorar ofertas sin registrarte
        </Link>
      </div>
    </div>
  );
};
