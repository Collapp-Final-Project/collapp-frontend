import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import { offerService } from "../../services/offerService";
import { CategoryFilter } from "../../components/common/offers/CategoryFilter/CategoryFilter";
import { OfferCard } from "../../components/common/offers/OfferCard/OfferCard";
import "./FeedPage.scss";

export const FeedPage = () => {
  const location = useLocation();
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [successMessage, setSuccessMessage] = useState(location.state?.deleteSuccess || null);

  useEffect(() => {
    if (successMessage) {
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    let isCancelled = false;

    const fetchOffers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = category ? { category } : {};
        const data = await offerService.list(params);
        if (!isCancelled) {
          setOffers(data.content);
        }
      } catch {
        if (!isCancelled) {
          setError("No se pudieron cargar las ofertas. Inténtalo de nuevo.");
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchOffers();
    return () => {
      isCancelled = true;
    };
  }, [category]);

  // Filtro client-side por título: solo busca sobre las ofertas ya cargadas
  const visibleOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h1>Collapp</h1>
        <div className="feed-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar proyectos, roles..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Buscar proyectos"
          />
        </div>
      </header>

      <CategoryFilter value={category} onChange={setCategory} />

      {successMessage && (
        <div className="feed-success-banner" role="status">
          <p>Oferta &quot;{successMessage}&quot; eliminada correctamente.</p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            aria-label="Cerrar mensaje"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      {isLoading && (
        <p role="status" aria-live="polite" className="feed-status">
          Cargando ofertas...
        </p>
      )}

      {error && (
        <p role="alert" className="feed-status feed-error">
          {error}
        </p>
      )}

      {!isLoading && !error && visibleOffers.length === 0 && (
        <p className="feed-status">No hay ofertas que coincidan con tu búsqueda.</p>
      )}

      <div className="feed-list">
        {visibleOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};