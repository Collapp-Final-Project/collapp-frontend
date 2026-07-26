export const COMPENSATION_LABEL = {
  PAID: "Remunerado",
  COLLABORATION: "Colaboración",
};

export const CATEGORY_CONFIG = {
  MAKEUP: { label: "Makeup", className: "specialty-sfx" },
  PHOTOGRAPHY_VIDEO: { label: "Foto / Vídeo", className: "specialty-photo" },
  MODEL_TALENT: { label: "Modelo / Talento", className: "specialty-model" },
  PRODUCTION: { label: "Producción", className: "specialty-prod" },
};

export const CATEGORIES = [
  { value: null, label: "Todos" },
  { value: "PHOTOGRAPHY_VIDEO", label: "Foto/Vídeo" },
  { value: "PRODUCTION", label: "Producción" },
  { value: "MAKEUP", label: "Makeup" },
  { value: "MODEL_TALENT", label: "Modelo/Talento" },
];

export const STORAGE_KEYS = {
  TOKEN: "collapp_token",
  USER: "collapp_user",
};

export const STATUS_CONFIG = {
  OPEN: { label: "Abierta", className: "status-open" },
  PAUSED: { label: "Pausada", className: "status-paused" },
  COVERED: { label: "Cerrada", className: "status-closed" },
};

export const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, { label }]) => ({
  value,
  label,
}));

export const APPLICATION_STATUS_CONFIG = {
  PENDING: { label: "Pendiente de revisión", color: "blue" },
  ACCEPTED: { label: "Postulación aceptada", color: "green" },
  REJECTED: { label: "Postulación rechazada", color: "red" },
};