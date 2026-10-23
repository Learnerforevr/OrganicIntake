import { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

import ProductToolbar from "../components/products/ProductToolbar.jsx";
import FilterSidebar from "../components/products/FilterSidebar.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";
import QuickViewModal from "../components/products/QuickViewModal.jsx";
import EmptyState from "../components/products/EmptyState.jsx";

import products from "../data/products.js";
import "./ProductsPage.css";

const CATEGORIES = [
  { name: "Fruits", slug: "fruits" },
  { name: "Vegetables", slug: "vegetables" },
  { name: "Grains & Pulses", slug: "grains-pulses" },
  { name: "Pantry & Groceries", slug: "pantry-groceries" },
];

const VALID_SORTS = [
  "featured",
  "price-asc",
  "price-desc",
  "name-asc",
  "newest",
];

const MIN_PRICE = Math.min(...products.map((product) => product.price));
const MAX_PRICE = Math.max(...products.map((product) => product.price));

const CATEGORY_COUNTS = Object.fromEntries(
  CATEGORIES.map((category) => [
    category.slug,
    products.filter(
      (product) => product.categorySlug === category.slug
    ).length,
  ])
);

function readPriceParam(params, key, fallback) {
  const raw = params.get(key);

  if (raw === null || raw.trim() === "") {
    return fallback;
  }

  const value = Number(raw);

  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(MIN_PRICE, Math.min(MAX_PRICE, value));
}

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Read catalog state from the URL.
  const searchValue = searchParams.get("search") ?? "";

  const selectedCategories = [
    ...new Set(
      (searchParams.get("category") ?? "")
        .split(",")
        .map((slug) => slug.trim().toLowerCase())
        .filter((slug) =>
          CATEGORIES.some((category) => category.slug === slug)
        )
    ),
  ];

  const requestedMinPrice = readPriceParam(
    searchParams,
    "minPrice",
    MIN_PRICE
  );

  const requestedMaxPrice = readPriceParam(
    searchParams,
    "maxPrice",
    MAX_PRICE
  );

  // Keep even manually edited or malformed URLs within a valid range.
  const minPrice = Math.min(requestedMinPrice, requestedMaxPrice);
  const maxPrice = Math.max(requestedMinPrice, requestedMaxPrice);

  const rawSort = searchParams.get("sort");
  const sortBy = VALID_SORTS.includes(rawSort)
    ? rawSort
    : "featured";

  const previewId = searchParams.get("preview");

  const selectedProduct =
    products.find((product) => product.id === previewId) ?? null;

  // General URL parameter updater.
  function updateParam(key, value, defaultValue = null) {
    const nextParams = new URLSearchParams(searchParams);

    const shouldDelete =
      value === null ||
      value === "" ||
      (
        defaultValue !== null &&
        String(value) === String(defaultValue)
      );

    if (shouldDelete) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, String(value));
    }

    setSearchParams(nextParams, { replace: true });
  }

  function handleSearchChange(value) {
    updateParam("search", value);
  }

  function handleSortChange(value) {
    updateParam("sort", value, "featured");
  }

  function updateCategories(nextCategories) {
    const nextParams = new URLSearchParams(searchParams);

    if (
      nextCategories.length === 0 ||
      nextCategories.length === CATEGORIES.length
    ) {
      nextParams.delete("category");
    } else {
      nextParams.set("category", nextCategories.join(","));
    }

    setSearchParams(nextParams, { replace: true });
  }

  function handleToggleCategory(slug) {
    const nextCategories = selectedCategories.includes(slug)
      ? selectedCategories.filter((item) => item !== slug)
      : [...selectedCategories, slug];

    updateCategories(nextCategories);
  }

  function handleClearCategories() {
    updateCategories([]);
  }

  function handleMinPriceChange(value) {
    const safeValue = Math.min(
      MAX_PRICE,
      Math.max(MIN_PRICE, Math.min(value, maxPrice))
    );

    updateParam("minPrice", safeValue, MIN_PRICE);
  }

  function handleMaxPriceChange(value) {
    const safeValue = Math.max(
      MIN_PRICE,
      Math.min(MAX_PRICE, Math.max(value, minPrice))
    );

    updateParam("maxPrice", safeValue, MAX_PRICE);
  }

  function handleClearFilters() {
    const nextParams = new URLSearchParams(searchParams);

    [
      "category",
      "search",
      "sort",
      "minPrice",
      "maxPrice",
    ].forEach((key) => nextParams.delete(key));

    // Keep preview if a modal is open.
    setSearchParams(nextParams, { replace: true });
  }

  function handleOpenProduct(product) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("preview", product.id);

    setSearchParams(nextParams);
  }

  // Keep the close handler current while preserving the active URL state.
  const currentQuery = searchParams.toString();

  const handleCloseProduct = useCallback(() => {
    const nextParams = new URLSearchParams(currentQuery);
    nextParams.delete("preview");

    setSearchParams(nextParams, { replace: true });
  }, [currentQuery, setSearchParams]);

  // Search, category and price filtering are combined.
  const filteredProducts = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        query === "" ||
        [
          product.name,
          product.description,
          product.category,
          ...(product.tags ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.categorySlug);

      const matchesPrice =
        product.price >= minPrice &&
        product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [
    searchValue,
    selectedCategories.join(","),
    minPrice,
    maxPrice,
  ]);

  // Apply the chosen sort order without mutating the original dataset.
  const visibleProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;

      case "featured":
      default:
        result.sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
        break;
    }

    return result;
  }, [filteredProducts, sortBy]);

  const hasPriceFilter =
    minPrice > MIN_PRICE || maxPrice < MAX_PRICE;

  const activeFilterCount =
    (searchValue.trim() !== "" ? 1 : 0) +
    (selectedCategories.length > 0 ? 1 : 0) +
    (hasPriceFilter ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <>
      <Header variant="products" />

      <main className="products-page">
        <div className="container products-intro">
          <p className="eyebrow products-intro__eyebrow">
            The OrganicIntake Marketplace
          </p>

          <h1 className="products-intro__heading">
            Explore our products.
          </h1>

          <p className="products-intro__description">
            Discover food and grocery essentials across
            four demo categories. Search, compare prices,
            and explore products at your own pace.
          </p>
        </div>

        <div className="container">
          <ProductToolbar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            resultCount={visibleProducts.length}
            activeFilterCount={activeFilterCount}
            isMobileFiltersOpen={isMobileFiltersOpen}
            onToggleMobileFilters={() =>
              setIsMobileFiltersOpen((open) => !open)
            }
          />

          <div className="catalog-layout">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              onClearCategories={handleClearCategories}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minBound={MIN_PRICE}
              maxBound={MAX_PRICE}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              onClearFilters={handleClearFilters}
              isMobileOpen={isMobileFiltersOpen}
              onClose={() => setIsMobileFiltersOpen(false)}
              activeFilterCount={activeFilterCount}
              categoryCounts={CATEGORY_COUNTS}
            />

            <section
              className="catalog-results"
              aria-label="Product results"
            >
              <div className="catalog-results__summary">
                <span>
                  Showing{" "}
                  <strong>{visibleProducts.length}</strong>{" "}
                  of {products.length} products
                </span>

                {hasActiveFilters && (
                  <button
                    type="button"
                    className="product-filter-sidebar__clear"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {visibleProducts.length > 0 ? (
                <ProductGrid
                  products={visibleProducts}
                  onProductSelect={handleOpenProduct}
                />
              ) : (
                <EmptyState
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={handleCloseProduct}
        />
      )}
    </>
  );
}

export default ProductsPage;