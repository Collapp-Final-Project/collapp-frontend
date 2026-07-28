import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { offerService } from "../../services/offerService";
import { applicationService } from "../../services/applicationService";
import { OfferPublicationCard } from "../../components/common/offers/OfferPublicationCard/OfferPublicationCard";
import "./MyPublicationsPage.scss";

export const MyPublicationsPage = () => {
  const [offersWithApplications, setOffersWithApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchMyOffersAndApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const myOffers = await offerService.listMine();

        const applicationsByOffer = await Promise.all(
          myOffers.map((offer) => applicationService.listByOffer(offer.id))
        );

        if (!isCancelled) {
          const combined = myOffers.map((offer, index) => ({
            offer,
            applications: applicationsByOffer[index],
          }));
          setOffersWithApplications(combined);
        }
      } catch {
        if (!isCancelled) {
          setError("No se pudieron cargar tus publicaciones.");
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchMyOffersAndApplications();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleApplicationStatusChange = async (applicationId, newStatus) => {
    try {
      const updatedApplication = await applicationService.updateStatus(applicationId, newStatus);

      setOffersWithApplications((prev) =>
        prev.map((entry) => {
          if (entry.offer.id !== updatedApplication.offerId) return entry;

          return {
            ...entry,
            applications: entry.applications.map((app) =>
              app.id === applicationId ? updatedApplication : app
            ),
          };
        })
      );
    } catch {
      setError("No se pudo actualizar la postulación.");
    }
  };

  const handleAccept = (applicationId) =>
    handleApplicationStatusChange(applicationId, "ACCEPTED");

  const handleReject = (applicationId) =>
    handleApplicationStatusChange(applicationId, "REJECTED");

  if (isLoading) {
    return (
      <p role="status" aria-live="polite" className="my-publications-status">
        Cargando tus publicaciones...
      </p>
    );
  }

  return (
    <div className="my-publications-page">
      <h1>Mis Publicaciones</h1>
      <p className="my-publications-subtitle">
        Sigue el estado de tus publicaciones en tiempo real
      </p>

      {error && (
        <p role="alert" className="my-publications-error">
          {error}
        </p>
      )}

      <Link to="/offers/new" className="my-publications-create">
        <span>Crear nueva oferta</span>
        <CirclePlus size={36} className="my-publications-create-icon" aria-hidden="true" />
      </Link>

      {offersWithApplications.length === 0 ? (
        <p className="my-publications-empty">
          Todavía no has creado ninguna oferta.
        </p>
      ) : (
        offersWithApplications.map(({ offer, applications }) => (
          <OfferPublicationCard
            key={offer.id}
            offer={offer}
            applications={applications}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))
      )}
    </div>
  );
};