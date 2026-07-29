import { Link } from "react-router-dom";
import { OfferCard } from "../../components/common/offers/OfferCard/OfferCard";
import "./LandingPage.scss";

const DEMO_OFFERS = [
  {
    id: "demo-1",
    title: "Modelo para sesión de caracterización SFX y terror",
    category: "MODEL_TALENT",
    status: "OPEN",
    location: "Plató independiente, Sabadell (Barcelona)",
    startDate: "2026-08-01",
    endDate: "2026-08-02",
    compensationType: "COLLABORATION",
  },
  {
    id: "demo-3",
    title: "Fotógrafo para book de moda sostenible",
    category: "PHOTOGRAPHY_VIDEO",
    status: "OPEN",
    location: "Turó Park, Barcelona",
    startDate: "2026-08-05",
    endDate: "2026-08-05",
    compensationType: "COLLABORATION",
  },
];

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-brand">
        <div className="landing-page-logo">
          <h1>Collapp</h1>
        </div>
       <h2>Encuentra tu próxima colaboración creativa</h2>

        <p className="landing-page-tagline">
          Publica proyectos, descubre oportunidades y conecta con maquilladores,
          fotógrafos, modelos y técnicos de tu zona.
        </p>

        <div className="landing-page-actions">
          <Link to="/register" className="landing-page-cta-primary">
            Crear Cuenta
          </Link>
          <Link to="/login" className="landing-page-cta-secondary">
            Iniciar Sesión
          </Link>
        </div>

        <Link to="/feed" className="landing-page-explore">
          Explorar ofertas sin registrarte
        </Link>
      </div>

      <div className="landing-page-cards" aria-hidden="true">
        {DEMO_OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};
