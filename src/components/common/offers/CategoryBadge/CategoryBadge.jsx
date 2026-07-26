import { CATEGORY_CONFIG } from "../../../../utils/constants";
import "./CategoryBadge.scss";

export const CategoryBadge = ({ category }) => {
  const config = CATEGORY_CONFIG[category];
  if (!config) return null;

  return (
    <span className={`category-badge ${config.className}`}>
      {config.label}
    </span>
  );
};