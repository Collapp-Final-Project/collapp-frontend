import { useEffect, useState } from "react";
import { Shield, LogOut } from "lucide-react";
import { X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { offerService } from "../../services/offerService";
import { AdminOfferCard } from "../../components/common/admin/AdminOfferCard/AdminOfferCard";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog/ConfirmDialog";
import "./AdminPage.scss";

export const AdminPage = () => {
  const { user, logout } = useAuth();
  const displayName = user?.username || "";
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    let isCancelled = false;

    const fetchAllOffers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await offerService.listAll();
        if (!isCancelled) setOffers(data);
      } catch {
        if (!isCancelled) setError("No se pudieron cargar las publicaciones.");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchAllOffers();
    return () => {
      isCancelled = true;
    };
  }, []);

  const confirmDelete = async () => {
    try {
      const title = offerToDelete.title;
      await offerService.remove(offerToDelete.id);
      setOffers((prev) => prev.filter((o) => o.id !== offerToDelete.id));
      setSuccessMessage(`Oferta "${title}" eliminada correctamente.`);
    } catch {
      setError("No se pudo eliminar la oferta.");
    } finally {
      setOfferToDelete(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-topbar">
        <Shield size={18} aria-hidden="true" />
        <span>Modo Administrador</span>
      </div>

      <div className="admin-page-content">
        <h1>Publicaciones</h1>
        {displayName && <p className="admin-greeting">Hola, {displayName}</p>}
        <p className="admin-page-subtitle">Revisión de ofertas.</p>

        {successMessage && (
          <div className="admin-page-success" role="status">
            <p>{successMessage}</p>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              aria-label="Cerrar mensaje"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        {error && (
          <p role="alert" className="admin-page-error">
            {error}
          </p>
        )}

        {isLoading ? (
          <p role="status" aria-live="polite" className="admin-page-status">
            Cargando publicaciones...
          </p>
        ) : offers.length === 0 ? (
          <p className="admin-page-status">No hay publicaciones que mostrar.</p>
        ) : (
          offers.map((offer) => (
            <AdminOfferCard
              key={offer.id}
              offer={offer}
              onDelete={setOfferToDelete}
            />
          ))
        )}

        <button className="admin-page-logout" onClick={logout}>
          <LogOut size={18} aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>

      <ConfirmDialog
        isOpen={!!offerToDelete}
        title="Eliminar oferta"
        message={`¿Seguro que quieres eliminar "${offerToDelete?.title}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setOfferToDelete(null)}
      />
    </div>
  );
};