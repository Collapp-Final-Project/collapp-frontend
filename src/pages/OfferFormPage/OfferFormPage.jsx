import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlayCircle, PauseCircle, Ban } from "lucide-react";
import { offerService } from "../../services/offerService";
import { useAuth } from "../../hooks/useAuth";
import { FormInput } from "../../components/ui/FormInput/FormInput";
import { SubmitButton } from "../../components/ui/SubmitButton/SubmitButton";
import { SpecialtySelector } from "../../components/common/auth/SpecialtySelector/SpecialtySelector";
import { CompensationSelector } from "../../components/common/offers/CompensationSelector/CompensationSelector";
import { STATUS_CONFIG } from "../../utils/constants";
import "./OfferFormPage.scss";

const REQUIREMENTS_SEPARATOR = "\n\nRequisitos:\n";

const parseDescriptionAndRequirements = (fullDescription) => {
  const separatorIndex = fullDescription.indexOf(REQUIREMENTS_SEPARATOR);

  if (separatorIndex === -1) {
    return { description: fullDescription, requirements: "" };
  }

  return {
    description: fullDescription.slice(0, separatorIndex),
    requirements: fullDescription.slice(separatorIndex + REQUIREMENTS_SEPARATOR.length),
  };
};

const INITIAL_STATE = {
  title: "",
  category: null,
  location: "",
  startDate: "",
  endDate: "",
  compensationType: null,
  status: "OPEN",
  description: "",
  requirements: "",
};

const STATUS_ICON = {
  OPEN: PlayCircle,
  PAUSED: PauseCircle,
  COVERED: Ban,
};

export const OfferFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchOffer = async () => {
      try {
        const offer = await offerService.getById(id);
        if (offer.creatorUsername !== user?.username) {
          navigate("/feed");
          return;
        }
        const { description, requirements } = parseDescriptionAndRequirements(offer.description);

        setFormData({
          title: offer.title,
          category: offer.category,
          location: offer.location,
          startDate: offer.startDate,
          endDate: offer.endDate,
          compensationType: offer.compensationType,
          status: offer.status,
          description,
          requirements,
        });
      } catch {
        setGeneralError("No se pudo cargar la oferta para editar.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchOffer();
  }, [id, isEditMode, navigate, user?.username]);

  const updateField = (field) => (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});
    setIsLoading(true);

    const fullDescription = formData.requirements.trim()
      ? `${formData.description}${REQUIREMENTS_SEPARATOR}${formData.requirements}`
      : formData.description;

    const payload = {
      title: formData.title,
      description: fullDescription,
      category: formData.category,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.endDate,
      compensationType: formData.compensationType,
      status: formData.status,
    };

    try {
      if (isEditMode) {
        await offerService.update(id, payload);
        navigate(`/offers/${id}`);
      } else {
        const created = await offerService.create(payload);
        navigate(`/offers/${created.id}`);
      }
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 400 && data?.fields) {
        setFieldErrors(data.fields);
      } else if (status === 403) {
        setGeneralError(data?.error || "No tienes permiso para realizar esta acción");
      } else {
        setGeneralError(data?.error || "Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <p role="status" aria-live="polite" className="offer-form-status">
        Cargando oferta...
      </p>
    );
  }

  return (
    <div className="offer-form-page">
      <div className="offer-form-header">
        <h1>{isEditMode ? "Editar oferta" : "Crear Oferta"}</h1>
        <button
          type="button"
          className="offer-form-close"
          onClick={() => navigate(-1)}
          aria-label="Cerrar formulario"
        >
          ✕
        </button>
      </div>

      <div className="offer-form-card">
        {generalError && (
          <p className="auth-error-message" role="alert">
            {generalError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="offer-form" noValidate>
          <FormInput
            id="title"
            label="Título del Proyecto"
            placeholder="Ej. Sesión de fotos editorial moda"
            value={formData.title}
            onChange={updateField("title")}
            error={fieldErrors.title}
            required
          />

          <SpecialtySelector
            id="category"
            label="Categoría Requerida"
            value={formData.category}
            onChange={updateField("category")}
            error={fieldErrors.category}
          />

          <FormInput
            id="location"
            label="Ubicación"
            placeholder="Ciudad o Estudio"
            value={formData.location}
            onChange={updateField("location")}
            error={fieldErrors.location}
            required
          />

          <FormInput
            id="startDate"
            type="date"
            label="Fecha Inicio"
            value={formData.startDate}
            onChange={updateField("startDate")}
            error={fieldErrors.startDate}
            required
          />

          <FormInput
            id="endDate"
            type="date"
            label="Fecha Fin"
            value={formData.endDate}
            onChange={updateField("endDate")}
            error={fieldErrors.endDate}
            required
          />

          <CompensationSelector
            id="compensationType"
            label="Tipo de Compensación"
            value={formData.compensationType}
            onChange={updateField("compensationType")}
            error={fieldErrors.compensationType}
          />

          <div className="offer-form-status-group">
            <label>Estado</label>
            <div className="offer-form-status-options">
              {Object.entries(STATUS_CONFIG).map(([value, { label }]) => {
                  const Icon = STATUS_ICON[value];
                  return (
                    <button
                      key={value}
                      type="button"
                      className={`offer-form-status-option${formData.status === value ? " active" : ""}`}
                      onClick={() => updateField("status")(value)}
                    >
                      {Icon && <Icon size={16} aria-hidden="true" />}
                      {label}
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="offer-form-textarea-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              placeholder="Describe los detalles, el mood de la sesión y lo que esperas del talento..."
              value={formData.description}
              onChange={updateField("description")}
              rows={4}
              required
            />
            {fieldErrors.description && (
              <span className="auth-error-message" role="alert">
                {fieldErrors.description}
              </span>
            )}
          </div>

          <div className="offer-form-textarea-group">
            <label htmlFor="requirements">Requisitos del Proyecto</label>
            <textarea
              id="requirements"
              placeholder="Experiencia, materiales propios, disponibilidad..."
              value={formData.requirements}
              onChange={updateField("requirements")}
              rows={4}
            />
          </div>

          <SubmitButton isLoading={isLoading} loadingText="Publicando...">
            {isEditMode ? "Guardar Cambios" : "Publicar Anuncio"}
          </SubmitButton>

          <button
            type="button"
            className="offer-form-cancel"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};