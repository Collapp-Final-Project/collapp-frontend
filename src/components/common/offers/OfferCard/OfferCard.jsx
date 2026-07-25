import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import "./OfferCard.scss";

const COMPENSATION_LABEL = {
  PAID: "Remunerado",
  COLLABORATION: "Colaboración",
};

const formatDateRange = (startDate, endDate) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const start = new Date(startDate).toLocaleDateString("es-ES", options);

  if (startDate === endDate) return start;

  const end = new Date(endDate).toLocaleDateString("es-ES", options);
  return `${start} – ${end}`;
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

  const CATEGORY_CLASS = {
    MAKEUP: "specialty-sfx",
    PHOTOGRAPHY_VIDEO: "specialty-photo",
    MODEL_TALENT: "specialty-model",
    PRODUCTION: "specialty-prod",
  };

  const categoryClass = CATEGORY_CLASS[category] || "";

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
        <span>{COMPENSATION_LABEL[compensationType] || compensationType}</span>
      </div>

      <div className="offer-card-footer">
        <Link to={`/offers/${id}`} className="offer-card-link">
          Ver Detalles
        </Link>
      </div>
    </article>
  );
};
