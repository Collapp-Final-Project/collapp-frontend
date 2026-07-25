import './StatusBadge.scss';

const STATUS_CONFIG = {
  OPEN: { label: 'Abierta', className: 'status-open' },
  PAUSED: { label: 'Pausada', className: 'status-paused' },
  COVERED: { label: 'Cerrada', className: 'status-closed' },
};

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.OPEN;

  return (
    <span className={`status-badge ${config.className}`}>
      <span className="status-dot" aria-hidden="true" />
      {config.label}
    </span>
  );
};