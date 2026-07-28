import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Banknote,
  Handshake,
} from "lucide-react";
import { offerService } from "../../services/offerService";
import { useAuth } from "../../hooks/useAuth";
import { CategoryBadge } from "../../components/common/offers/CategoryBadge/CategoryBadge";
import { StatusBadge } from "../../components/common/offers/StatusBadge/StatusBadge";
import { AvatarPreview } from "../../components/ui/AvatarPreview/AvatarPreview";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog/ConfirmDialog";
import { formatDateRange } from "../../utils/formatDate";
import { COMPENSATION_LABEL } from "../../utils/constants";
import { applicationService } from "../../services/applicationService";
import { OfferApplicationBox } from "../../components/common/applications/OfferApplicationBox/OfferApplicationBox";
import "./OfferDetailPage.scss";

const COMPENSATION_ICON = {
  PAID: Banknote,
  COLLABORATION: Handshake,
};

export const OfferDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [applicationError, setApplicationError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchOffer = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await offerService.getById(id);
        if (!isCancelled) setOffer(data);
      } catch (err) {
        if (!isCancelled) {
          setError(
            err.response?.status === 404
              ? "Esta oferta ya no existe."
              : "No se pudo cargar la oferta.",
          );
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchOffer();
    return () => {
      isCancelled = true;
    };
  }, [id]);

  const handleApply = async (message) => {
    setIsSubmittingApplication(true);
    setApplicationError(null);

    try {
      await applicationService.create(offer.id, message);
      setHasApplied(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setApplicationError("Ya te has postulado a esta oferta.");
      } else if (err.response?.status === 400) {
        setApplicationError("No puedes postularte a tu propia oferta.");
      } else {
        setApplicationError("Ha ocurrido un error al enviar tu postulación.");
      }
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await offerService.remove(offer.id);
      navigate("/feed", { state: { deleteSuccess: offer.title } });
    } catch {
      setError("No se pudo eliminar la oferta.");
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <p role="status" aria-live="polite" className="offer-detail-status">
        Cargando oferta...
      </p>
    );
  }

  if (error || !offer) {
    return (
      <p role="alert" className="offer-detail-status offer-detail-error">
        {error || "Oferta no encontrada."}
      </p>
    );
  }

  const isOwner = user?.username === offer.creatorUsername;
  const CompensationIcon = COMPENSATION_ICON[offer.compensationType];

  return (
    <div className="offer-detail-page">
      <button className="offer-detail-back" onClick={() => navigate("/feed")}>
        <ArrowLeft size={18} aria-hidden="true" /> Volver al tablón
      </button>

      <div className="offer-detail-card">
        <h1 className="offer-detail-title">{offer.title}</h1>

        <div className="offer-detail-badges">
          <CategoryBadge category={offer.category} />
          <StatusBadge status={offer.status} />
        </div>

        <div className="offer-detail-meta">
          <span>
            <MapPin size={16} aria-hidden="true" /> {offer.location}
          </span>
          <span>
            <Calendar size={16} aria-hidden="true" />{" "}
            {formatDateRange(offer.startDate, offer.endDate)}
          </span>
          <span>
            {CompensationIcon && (
              <CompensationIcon size={16} aria-hidden="true" />
            )}
            {COMPENSATION_LABEL[offer.compensationType] ||
              offer.compensationType}
          </span>
        </div>

        <section className="offer-detail-section">
          <h2>Sobre el proyecto</h2>
          <p className="offer-detail-description">{offer.description}</p>
        </section>

        {isOwner ? (
          <div className="offer-detail-owner-actions">
            <Link
              to={`/offers/${offer.id}/edit`}
              className="offer-detail-edit-button"
            >
              Editar Oferta
            </Link>
            <button
              type="button"
              className="offer-detail-delete-button"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Eliminar Oferta
            </button>
          </div>
       ) : hasApplied ? (
          <p className="offer-detail-applied-message" role="status">
            ¡Te has inscrito correctamente en este proyecto!
          </p>
        ) : (
          <div className="offer-detail-apply-section">
            {applicationError && (
              <p className="offer-detail-apply-error" role="alert">
                {applicationError}
              </p>
            )}
            <OfferApplicationBox onSubmit={handleApply} isSubmitting={isSubmittingApplication} />
          </div>
        )}
      </div>

      <div className="offer-detail-publisher">
        <span className="offer-detail-publisher-label">Publicado por</span>
        <div className="offer-detail-publisher-info">
          <AvatarPreview src={offer.creatorAvatarUrl || null} />
          <span className="offer-detail-publisher-name">
            {offer.creatorUsername}
          </span>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Eliminar oferta"
        message="¿Seguro que quieres eliminar esta oferta? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};
