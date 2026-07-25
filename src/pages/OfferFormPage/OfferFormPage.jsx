import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { offerService } from '../../services/offerService';
import { FormInput } from '../../components/ui/FormInput/FormInput';
import { SubmitButton } from '../../components/ui/SubmitButton/SubmitButton';
import { SpecialtySelector } from '../../components/common/auth/SpecialtySelector/SpecialtySelector';
import { CompensationSelector } from '../../components/common/offers/CompensationSelector/CompensationSelector';
import './OfferFormPage.scss';

const REQUIREMENTS_SEPARATOR = '\n\nRequisitos:\n';

const INITIAL_STATE = {
  title: '',
  category: null,
  location: '',
  startDate: '',
  endDate: '',
  compensationType: null,
  description: '',
  requirements: '',
};

export const OfferFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

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

        // Reconstruye description/requirements a partir del separador fijo
        // que usamos al concatenar — evita que el usuario tenga que
        // cortar/pegar texto manualmente entre ambos campos.
        const separatorIndex = offer.description.indexOf(REQUIREMENTS_SEPARATOR);
        const description = separatorIndex !== -1
          ? offer.description.slice(0, separatorIndex)
          : offer.description;
        const requirements = separatorIndex !== -1
          ? offer.description.slice(separatorIndex + REQUIREMENTS_SEPARATOR.length)
          : '';

        setFormData({
          title: offer.title,
          category: offer.category,
          location: offer.location,
          startDate: offer.startDate,
          endDate: offer.endDate,
          compensationType: offer.compensationType,
          description,
          requirements,
        });
      } catch (err) {
        setGeneralError('No se pudo cargar la oferta para editar.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchOffer();
  }, [id, isEditMode]);

  const updateField = (field) => (e) => {
    const value = typeof e === 'string' ? e : e.target.value;
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
        setGeneralError(data?.error || 'No tienes permiso para realizar esta acción');
      } else {
        setGeneralError(data?.error || 'Ocurrió un error inesperado. Inténtalo de nuevo.');
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
        <h1>{isEditMode ? 'Editar Oferta' : 'Crear Oferta'}</h1>
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
            onChange={updateField('title')}
            error={fieldErrors.title}
            required
          />

          <SpecialtySelector
            id="category"
            label="Categoría Requerida"
            value={formData.category}
            onChange={updateField('category')}
            error={fieldErrors.category}
          />

          <FormInput
            id="location"
            label="Ubicación"
            placeholder="Ciudad o Estudio"
            value={formData.location}
            onChange={updateField('location')}
            error={fieldErrors.location}
            required
          />

          <FormInput
            id="startDate"
            type="date"
            label="Fecha Inicio"
            value={formData.startDate}
            onChange={updateField('startDate')}
            error={fieldErrors.startDate}
            required
          />

          <FormInput
            id="endDate"
            type="date"
            label="Fecha Fin"
            value={formData.endDate}
            onChange={updateField('endDate')}
            error={fieldErrors.endDate}
            required
          />

          <CompensationSelector
            id="compensationType"
            label="Tipo de Compensación"
            value={formData.compensationType}
            onChange={updateField('compensationType')}
            error={fieldErrors.compensationType}
          />

          <div className="offer-form-textarea-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              placeholder="Describe los detalles, el mood de la sesión y lo que esperas del talento..."
              value={formData.description}
              onChange={updateField('description')}
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
              onChange={updateField('requirements')}
              rows={4}
            />
          </div>

          <SubmitButton isLoading={isLoading} loadingText="Publicando...">
            {isEditMode ? 'Guardar Cambios' : 'Publicar Anuncio'}
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