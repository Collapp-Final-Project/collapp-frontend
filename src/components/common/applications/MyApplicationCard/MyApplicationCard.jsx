import { Link } from "react-router-dom";
import { APPLICATION_STATUS_CONFIG } from "../../../../utils/constants";
import { formatRelativeDate } from "../../../../utils/formatDate";
import "./MyApplicationCard.scss";

export const MyApplicationCard = ({ application }) => {
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
      <div className="my-application-card-header">
        <h2>{offerTitle}</h2>
        <span
          className={`my-application-card-status my-application-card-status--${statusInfo.color}`}
        >
          <span className="dot" aria-hidden="true" />
          {statusInfo.label}
        </span>
      </div>
      <p className="my-application-card-meta">Creador: {creatorFullName}</p>
      <p className="my-application-card-date">
        Fecha de envío: {formatRelativeDate(createdAt)}
      </p>

      {isAccepted && (
        <div className="my-application-card-contact">
          <p>Contacto habilitado:</p>
          <p>
            {creatorEmail}
            {creatorInstagramUrl && ` · @${creatorInstagramUrl}`}
          </p>
        </div>
      )}

      <div className="my-application-card-footer">
        <Link to={`/offers/${offerId}`} className="my-application-card-link">
          Ver Oferta Original
        </Link>
      </div>
    </article>
  );
};
