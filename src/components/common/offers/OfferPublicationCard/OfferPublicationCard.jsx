import { useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { ApplicantCard } from "../../applications/ApplicantCard/ApplicantCard";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import "./OfferPublicationCard.scss";

export const OfferPublicationCard = ({ offer, applications, onAccept, onReject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = `applicants-panel-${offer.id}`;
  const applicantCount = applications.length;

  return (
    <article className="offer-publication-card">
      <div className="offer-publication-card-header">
        <CategoryBadge category={offer.category} />
        <StatusBadge status={offer.status} />
      </div>

      <h2>{offer.title}</h2>
      <p className="offer-publication-card-description">{offer.description}</p>

      <div className="offer-publication-card-footer">
        <button
          type="button"
          className="offer-publication-card-toggle"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          disabled={applicantCount === 0}
        >
          <Users size={16} aria-hidden="true" />
          {applicantCount} Postulante{applicantCount !== 1 ? "s" : ""}
        </button>

        <Link to={`/offers/${offer.id}`} className="offer-publication-card-details">
          Ver Detalles
        </Link>
      </div>

      {isExpanded && applicantCount > 0 && (
        <div id={panelId} className="offer-publication-card-applicants">
          <h3>Postulantes</h3>
          {applications.map((application) => (
            <ApplicantCard
              key={application.id}
              application={application}
              onAccept={onAccept}
              onReject={onReject}
            />
          ))}
        </div>
      )}
    </article>
  );
};