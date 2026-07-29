export const formatDateRange = (startDate, endDate) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const start = new Date(startDate).toLocaleDateString("es-ES", options);

  if (startDate === endDate) return start;

  const end = new Date(endDate).toLocaleDateString("es-ES", options);
  return `${start} – ${end}`;
};

export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return "Hace un momento";
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
  if (diffInHours < 24) return `Hace ${diffInHours} h`;
  if (diffInDays === 1) return "Hace 1 día";
  if (diffInDays < 7) return `Hace ${diffInDays} días`;

  const weeks = Math.floor(diffInDays / 7);
  if (weeks === 1) return "Hace 1 semana";
  if (diffInDays < 30) return `Hace ${weeks} semanas`;

  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};