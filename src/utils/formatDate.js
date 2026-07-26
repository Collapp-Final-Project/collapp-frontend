export const formatDateRange = (startDate, endDate) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const start = new Date(startDate).toLocaleDateString("es-ES", options);

  if (startDate === endDate) return start;

  const end = new Date(endDate).toLocaleDateString("es-ES", options);
  return `${start} – ${end}`;
};
