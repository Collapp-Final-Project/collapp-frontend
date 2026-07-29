import { AvatarPreview } from "../../../ui/AvatarPreview/AvatarPreview";
import { CATEGORY_CONFIG } from "../../../../utils/constants";
import "./ApplicantCard.scss";

export const ApplicantCard = ({ application, onAccept, onReject }) => {
  const {
    applicantFullName,
    applicantSpecialty,
    applicantAvatarUrl,
    message,
    status,
  } = application;

  const isPending = status === "PENDING";
  const specialtyLabel = CATEGORY_CONFIG[applicantSpecialty]?.label ?? applicantSpecialty;

  return (
    <article className="applicant-card">
      <AvatarPreview src={applicantAvatarUrl} name={applicantFullName} />

      <div className="applicant-card-info">
        <h3>{applicantFullName}</h3>
        <p className="applicant-card-specialty">{specialtyLabel}</p>
        {message && <p className="applicant-card-message">{message}</p>}
      </div>

      {isPending ? (
        <div className="applicant-card-actions">
          <button
            onClick={() => onAccept(application.id)}
            aria-label={`Aceptar a ${applicantFullName}`}
          >
            Aceptar
          </button>
          <button
            onClick={() => onReject(application.id)}
            aria-label={`Rechazar a ${applicantFullName}`}
          >
            Rechazar
          </button>
        </div>
      ) : (
        <span className={`applicant-card-status applicant-card-status--${status.toLowerCase()}`}>
          {status === "ACCEPTED" ? "Aceptado" : "Rechazado"}
        </span>
      )}
    </article>
  );
};