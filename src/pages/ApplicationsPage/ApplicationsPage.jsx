import { useEffect, useState } from "react";
import { applicationService } from "../../services/applicationService";
import { MyApplicationCard } from "../../components/common/applications/MyApplicationCard/MyApplicationCard";
import "./ApplicationsPage.scss";

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchMyApplications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await applicationService.listMine();
        if (!isCancelled) setApplications(data);
      } catch {
        if (!isCancelled) {
          setError("No se pudieron cargar tus inscripciones.");
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchMyApplications();
    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <p role="status" aria-live="polite" className="applications-page-status">
        Cargando tus inscripciones...
      </p>
    );
  }

  return (
    <div className="applications-page">
      <h1>Mis Postulaciones</h1>
      <p className="applications-page-subtitle">
        Sigue el estado de tus candidaturas en tiempo real
      </p>

      {error && (
        <p role="alert" className="applications-page-error">
          {error}
        </p>
      )}

      {applications.length === 0 ? (
        <p className="applications-page-empty">
          Todavía no te has inscrito a ningún proyecto.
        </p>
      ) : (
        applications.map((application) => (
          <MyApplicationCard key={application.id} application={application} />
        ))
      )}
    </div>
  );
};