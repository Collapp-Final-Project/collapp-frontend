import { Link } from "react-router-dom";
import { MapPin, Calendar, Banknote, Handshake } from "lucide-react";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { formatDateRange } from "../../../../utils/formatDate";
import { COMPENSATION_LABEL, CATEGORY_CONFIG } from "../../../../utils/constants";
import "./OfferCard.scss";

const COMPENSATION_ICON = {
  PAID: Banknote,
  COLLABORATION: Handshake,
};

export const OfferCard = ({ offer }) => {
  const {
    id,
    title,
    category,
    status,
    location,
    startDate,
    endDate,
    compensationType,
  } = offer;

  const categoryClass = CATEGORY_CONFIG[category]?.className || "";
  const CompensationIcon = COMPENSATION_ICON[compensationType];

  return (
    <article className={`offer-card ${categoryClass}`}>
      <div className="offer-card-header">
        <CategoryBadge category={category} />
        <StatusBadge status={status} />
      </div>

      <h3 className="offer-card-title">{title}</h3>

      <div className="offer-card-meta">
        <span>
          <MapPin size={14} aria-hidden="true" /> {location}
        </span>
        <span>
          <Calendar size={14} aria-hidden="true" />{" "}
          {formatDateRange(startDate, endDate)}
        </span>
        <span>
          {CompensationIcon && <CompensationIcon size={14} aria-hidden="true" />}
          {COMPENSATION_LABEL[compensationType] || compensationType}
        </span>
      </div>

      <div className="offer-card-footer">
        <Link to={`/offers/${id}`} className="offer-card-link">
          Ver Detalles
        </Link>
      </div>
    </article>
  );
};
