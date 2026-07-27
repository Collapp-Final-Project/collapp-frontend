import { useEffect, useState } from "react";
import { Shield, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { offerService } from "../../services/offerService";
import { AdminOfferCard } from "../../components/common/admin/AdminOfferCard/AdminOfferCard";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog/ConfirmDialog";
import "./AdminPage.scss";

export const AdminPage = () => {
  const { logout } = useAuth();
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offerToDelete, setOfferToDelete] = useState(null);

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
      await offerService.remove(offerToDelete.id);
      setOffers((prev) => prev.filter((o) => o.id !== offerToDelete.id));
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
        <p className="admin-page-subtitle">Revisión de ofertas.</p>

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
          Cerrar Sesión
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