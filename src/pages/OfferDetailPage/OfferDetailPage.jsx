import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { offerService } from '../../services/offerService';
import { useAuth } from '../../hooks/useAuth';
import { CategoryBadge } from '../../components/common/offers/CategoryBadge/CategoryBadge';
import { StatusBadge } from '../../components/common/offers/StatusBadge/StatusBadge';
import { AvatarPreview } from '../../components/ui/AvatarPreview/AvatarPreview';
import './OfferDetailPage.scss';

const COMPENSATION_LABEL = {
  PAID: 'Remunerado',
  COLLABORATION: 'Colaboración',
};

const STATUS_OPTIONS = [
  { value: 'OPEN', label: 'Abierta' },
  { value: 'PAUSED', label: 'Pausada' },
  { value: 'COVERED', label: 'Cerrada' },
];

const formatDateRange = (startDate, endDate) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const start = new Date(startDate).toLocaleDateString('es-ES', options);
  if (startDate === endDate) return start;
  const end = new Date(endDate).toLocaleDateString('es-ES', options);
  return `${start} – ${end}`;
};

export const OfferDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
              ? 'Esta oferta ya no existe.'
              : 'No se pudo cargar la oferta.'
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

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const updated = await offerService.updateStatus(offer.id, newStatus);
      setOffer(updated);
    } catch (err) {
      setError('No se pudo actualizar el estado.');
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      '¿Seguro que quieres eliminar esta oferta? Esta acción no se puede deshacer.'
    );
    if (!confirmed) return;

    try {
      await offerService.remove(offer.id);
      navigate('/feed');
    } catch (err) {
      setError('No se pudo eliminar la oferta.');
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
        {error || 'Oferta no encontrada.'}
      </p>
    );
  }

  const isOwner = user?.username === offer.creatorUsername;

  return (
    <div className="offer-detail-page">
      <button className="offer-detail-back" onClick={() => navigate('/feed')}>
        <ArrowLeft size={18} aria-hidden="true" /> Volver al tablón
      </button>

      <div className="offer-detail-card">
        <h1 className="offer-detail-title">{offer.title}</h1>

        <div className="offer-detail-badges">
          <CategoryBadge category={offer.category} />

          {isOwner ? (
            <select
              className="status-select-inline"
              value={offer.status}
              onChange={handleStatusChange}
              aria-label="Cambiar estado de la oferta"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <StatusBadge status={offer.status} />
          )}
        </div>

        <div className="offer-detail-meta">
          <span>
            <MapPin size={16} aria-hidden="true" /> {offer.location}
          </span>
          <span>
            <Calendar size={16} aria-hidden="true" /> {formatDateRange(offer.startDate, offer.endDate)}
          </span>
          <span>{COMPENSATION_LABEL[offer.compensationType] || offer.compensationType}</span>
        </div>

        <section className="offer-detail-section">
          <h2>Sobre el proyecto</h2>
          <p className="offer-detail-description">{offer.description}</p>
        </section>

        {isOwner ? (
          <div className="offer-detail-owner-actions">
            <Link to={`/offers/${offer.id}/edit`} className="offer-detail-edit-button">
              Editar Oferta
            </Link>
            <button type="button" className="offer-detail-delete-button" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        ) : (
          <button className="offer-detail-cta" type="button">
            Postularme a este proyecto
          </button>
        )}
      </div>

      <div className="offer-detail-publisher">
        <span className="offer-detail-publisher-label">Publicado por</span>
        <div className="offer-detail-publisher-info">
          <AvatarPreview src={null} />
          <span className="offer-detail-publisher-name">{offer.creatorUsername}</span>
        </div>
      </div>
    </div>
  );
};