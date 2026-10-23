import { useEffect, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";

const CATEGORIES = [
  { name: "Fruits", slug: "fruits" },
  { name: "Vegetables", slug: "vegetables" },
  { name: "Grains & Pulses", slug: "grains-pulses" },
  { name: "Pantry & Groceries", slug: "pantry-groceries" },
];

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  onClearCategories,
  minPrice,
  maxPrice,
  minBound,
  maxBound,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
  isMobileOpen,
  onClose,
  activeFilterCount,
  categoryCounts,
}) {
  const [minDraft, setMinDraft] = useState(String(minPrice));
  const [maxDraft, setMaxDraft] = useState(String(maxPrice));

  useEffect(() => {
    setMinDraft(String(minPrice));
  }, [minPrice]);

  useEffect(() => {
    setMaxDraft(String(maxPrice));
  }, [maxPrice]);

  const priceSpan = Math.max(maxBound - minBound, 1);

  const leftPercent =
    ((minPrice - minBound) / priceSpan) * 100;

  const rightPercent =
    ((maxPrice - minBound) / priceSpan) * 100;

  function commitMinPrice() {
    const parsed = minDraft.trim() === ""
      ? minBound
      : Number(minDraft);

    const value = Number.isFinite(parsed)
      ? clamp(parsed, minBound, maxPrice)
      : minPrice;

    setMinDraft(String(value));
    onMinPriceChange(value);
  }

  function commitMaxPrice() {
    const parsed = maxDraft.trim() === ""
      ? maxBound
      : Number(maxDraft);

    const value = Number.isFinite(parsed)
      ? clamp(parsed, minPrice, maxBound)
      : maxPrice;

    setMaxDraft(String(value));
    onMaxPriceChange(value);
  }

  function handleRangeMinChange(event) {
    const value = Math.min(
      Number(event.target.value),
      maxPrice
    );

    setMinDraft(String(value));
    onMinPriceChange(value);
  }

  function handleRangeMaxChange(event) {
    const value = Math.max(
      Number(event.target.value),
      minPrice
    );

    setMaxDraft(String(value));
    onMaxPriceChange(value);
  }

  const allSelected = selectedCategories.length === 0;

  return (
    <aside
      id="product-filter-sidebar"
      className={`product-filter-sidebar ${
        isMobileOpen ? "is-mobile-open" : ""
      }`}
      aria-label="Product filters"
    >
      <div className="product-filter-sidebar__header">
        <div>
          <h2>Filters</h2>
          <p>Refine your selection</p>
        </div>

        <button
          type="button"
          className="product-filter-sidebar__mobile-close"
          onClick={onClose}
          aria-label="Close filters"
        >
          <X size={21} aria-hidden="true" />
        </button>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          className="product-filter-sidebar__clear"
          onClick={onClearFilters}
        >
          <RotateCcw size={15} aria-hidden="true" />
          Clear all filters
        </button>
      )}

      <section className="filter-group" aria-labelledby="category-filter">
        <h3 id="category-filter">Categories</h3>

        <div className="filter-checkboxes">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onClearCategories}
            />

            <span className="filter-checkbox__box" aria-hidden="true">
              <Check size={13} />
            </span>

            <span className="filter-checkbox__label">
              All Products
            </span>
          </label>

          {CATEGORIES.map((category) => (
            <label
              className="filter-checkbox"
              key={category.slug}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => onToggleCategory(category.slug)}
              />

              <span className="filter-checkbox__box" aria-hidden="true">
                <Check size={13} />
              </span>

              <span className="filter-checkbox__label">
                {category.name}
              </span>

              <span className="filter-checkbox__count">
                {categoryCounts[category.slug] ?? 0}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="filter-group" aria-labelledby="price-filter">
        <div className="filter-group__heading">
          <h3 id="price-filter">Price Range</h3>
          <span className="filter-group__currency">INR (₹)</span>
        </div>

        <div className="price-inputs">
          <label>
            <span>Minimum</span>
            <input
              type="number"
              inputMode="numeric"
              min={minBound}
              max={maxPrice}
              step="1"
              value={minDraft}
              onChange={(event) => setMinDraft(event.target.value)}
              onBlur={commitMinPrice}
              onKeyDown={(event) => {
                if (event.key === "Enter") event.currentTarget.blur();
              }}
              aria-label="Minimum product price"
            />
          </label>

          <span className="price-inputs__separator">—</span>

          <label>
            <span>Maximum</span>
            <input
              type="number"
              inputMode="numeric"
              min={minPrice}
              max={maxBound}
              step="1"
              value={maxDraft}
              onChange={(event) => setMaxDraft(event.target.value)}
              onBlur={commitMaxPrice}
              onKeyDown={(event) => {
                if (event.key === "Enter") event.currentTarget.blur();
              }}
              aria-label="Maximum product price"
            />
          </label>
        </div>

        <div
          className="price-range"
          style={{
            "--range-left": `${leftPercent}%`,
            "--range-width": `${rightPercent - leftPercent}%`,
          }}
        >
          <div className="price-range__track">
            <span className="price-range__selected" />
          </div>

          <input
            className="price-range__input price-range__input--min"
            type="range"
            min={minBound}
            max={maxBound}
            step="1"
            value={minPrice}
            onChange={handleRangeMinChange}
            aria-label="Minimum price slider"
          />

          <input
            className="price-range__input price-range__input--max"
            type="range"
            min={minBound}
            max={maxBound}
            step="1"
            value={maxPrice}
            onChange={handleRangeMaxChange}
            aria-label="Maximum price slider"
          />
        </div>

        <div className="price-range__bounds">
          <span>₹{minBound}</span>
          <span>₹{maxBound}</span>
        </div>

        <p className="filter-group__note">
          Filters use each demo product's listed price.
          Package sizes and units are shown on product cards.
        </p>
      </section>

      <button
        type="button"
        className="product-filter-sidebar__reset"
        onClick={onClearFilters}
      >
        Reset filters
      </button>
    </aside>
  );
}

export default FilterSidebar;