import { useState } from "react";
import { ArrowUpRight, Leaf } from "lucide-react";

import "./ProductCard.css";

function ProductCard({ product, onSelect }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__trigger"
        onClick={() => onSelect(product)}
        aria-label={`Quick view: ${product.name}, ${product.priceLabel}`}
      >
        <div
          className={`product-card__image-wrap ${
            imageError ? "product-card__image-wrap--error" : ""
          }`}
        >
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="product-card__image-fallback">
              <Leaf size={30} aria-hidden="true" />
              <span>OrganicIntake</span>
            </div>
          )}

          {product.featured && (
            <span className="product-card__badge">
              Featured
            </span>
          )}

          <span className="product-card__open" aria-hidden="true">
            <ArrowUpRight size={19} />
          </span>
        </div>

        <div className="product-card__body">
          <p className="product-card__category">
            {product.category}
          </p>

          <h3>{product.name}</h3>

          <p className="product-card__description">
            {product.description}
          </p>

          <div className="product-card__price-row">
            <span className="product-card__price">
              {product.priceLabel}
            </span>

            <span className="product-card__package">
              {product.packageSize}
            </span>
          </div>

          <span className="product-card__quick-view">
            Quick View
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </div>
      </button>
    </article>
  );
}

export default ProductCard;