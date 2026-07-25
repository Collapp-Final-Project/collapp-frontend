import './CategoryBadge.scss';

const CATEGORY_CONFIG = {
  MAKEUP: { label: 'Makeup', className: 'specialty-sfx' },
  PHOTOGRAPHY_VIDEO: { label: 'Foto / Vídeo', className: 'specialty-photo' },
  MODEL_TALENT: { label: 'Modelo / Talento', className: 'specialty-model' },
  PRODUCTION: { label: 'Producción', className: 'specialty-prod' },
};

export const CategoryBadge = ({ category }) => {
  const config = CATEGORY_CONFIG[category];
  if (!config) return null;

  return (
    <span className={`category-badge ${config.className}`}>
      {config.label}
    </span>
  );
};