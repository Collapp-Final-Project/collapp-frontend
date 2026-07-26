// MyApplicationCard.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { APPLICATION_STATUS_CONFIG } from "../../../../utils/constants";
import { formatDateRange } from "../../../../utils/formatDate";
import "./MyApplicationCard.scss";

function MyApplicationCard({ application }) {
  const {
    offerId,
    offerTitle,
    creatorFullName,
    creatorEmail,
    creatorInstagramUrl,
    status,
    createdAt,
  } = application;

  const statusInfo = APPLICATION_STATUS_CONFIG[status];
  const isAccepted = status === "ACCEPTED";

  return (
    <article className="my-application-card">
      <h2>{offerTitle}</h2>
      <p className="my-application-card-meta">
        Creador: {creatorFullName} · Fecha de envío: {formatDateRange(createdAt, createdAt)}
      </p>

      <span className={`my-application-card-status my-application-card-status--${statusInfo.color}`}>
        {statusInfo.label}
      </span>

      {isAccepted && (
        <div className="my-application-card-contact">
          <p>Contacto habilitado:</p>
          <p>{creatorEmail}{creatorInstagramUrl && ` · @${creatorInstagramUrl}`}</p>
        </div>
      )}

      <Link to={`/offers/${offerId}`} className="my-application-card-link">
        Ver Oferta Original
      </Link>
    </article>
  );
}

MyApplicationCard.propTypes = {
  application: PropTypes.object.isRequired,
};

export default MyApplicationCard;