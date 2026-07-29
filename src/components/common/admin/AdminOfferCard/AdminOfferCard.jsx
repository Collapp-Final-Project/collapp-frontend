import { Trash2 } from "lucide-react";
import { CategoryBadge } from "../../offers/CategoryBadge/CategoryBadge";
import { StatusBadge } from "../../offers/StatusBadge/StatusBadge";
import "./AdminOfferCard.scss";

export const AdminOfferCard = ({ offer, onDelete }) => {
  return (
    <article className="admin-offer-card">
      <div className="admin-offer-card-header">
        <CategoryBadge category={offer.category} />
        <StatusBadge status={offer.status} />
      </div>

      <h2>{offer.title}</h2>

      <p className="admin-offer-card-creator">
        Usuario: {offer.creatorUsername}
      </p>

      <p className="admin-offer-card-description">{offer.description}</p>

      <button
        type="button"
        className="admin-offer-card-delete"
        onClick={() => onDelete(offer)}
      >
        <Trash2 size={16} aria-hidden="true" /> Eliminar
      </button>
    </article>
  );
};