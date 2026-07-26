import { CATEGORIES } from "../../../../utils/constants";
import "./CategoryFilter.scss";

export const CategoryFilter = ({ value, onChange }) => (
  <div className="category-filter" role="tablist" aria-label="Filtrar por categoría">
    {CATEGORIES.map((cat) => {
      const isActive = value === cat.value;
      return (
        <button
          key={cat.label}
          type="button"
          role="tab"
          aria-selected={isActive}
          className={`category-filter-chip ${isActive ? "category-filter-active" : ""}`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      );
    })}
  </div>
);