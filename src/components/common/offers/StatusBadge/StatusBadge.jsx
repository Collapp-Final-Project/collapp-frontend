import { STATUS_CONFIG } from "../../../../utils/constants";
import "./StatusBadge.scss";

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.OPEN;

  return (
    <span className={`status-badge ${config.className}`}>
      <span className="status-dot" aria-hidden="true" />
      {config.label}
    </span>
  );
};