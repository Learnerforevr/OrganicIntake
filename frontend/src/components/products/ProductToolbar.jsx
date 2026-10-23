import { Search, SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "newest", label: "Newest First" },
];

function ProductToolbar({
  searchValue,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
  activeFilterCount,
  isMobileFiltersOpen,
  onToggleMobileFilters,
}) {
  return (
    <div className="product-toolbar">
      <div className="product-toolbar__search">
        <Search size={19} aria-hidden="true" />

        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search organic products..."
          aria-label="Search products by name or description"
        />

        {searchValue && (
          <button
            type="button"
            className="product-toolbar__clear-search"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <X size={17} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="product-toolbar__actions">
        <button
          type="button"
          className="product-toolbar__filter-button"
          onClick={onToggleMobileFilters}
          aria-expanded={isMobileFiltersOpen}
          aria-controls="product-filter-sidebar"
        >
          <SlidersHorizontal size={18} aria-hidden="true" />
          Filters

          {activeFilterCount > 0 && (
            <span className="product-toolbar__filter-count">
              {activeFilterCount}
            </span>
          )}
        </button>

        <label className="product-toolbar__sort">
          <span>Sort by</span>

          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <span className="product-toolbar__sr-count" aria-live="polite">
        {resultCount} products found
      </span>
    </div>
  );
}

export default ProductToolbar;