import { Leaf, RotateCcw } from "lucide-react";

function EmptyState({ hasActiveFilters, onClearFilters }) {
  return (
    <div className="catalog-empty-state">
      <div className="catalog-empty-state__icon">
        <Leaf size={32} aria-hidden="true" />
      </div>

      <h2>
        {hasActiveFilters
          ? "No matching products found"
          : "Our catalog is getting ready"}
      </h2>

      <p>
        {hasActiveFilters
          ? "Try a different search or adjust your filters to discover more products."
          : "There are no products to display right now."}
      </p>

      {hasActiveFilters && (
        <button
          type="button"
          className="button button-secondary"
          onClick={onClearFilters}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;