import { useEffect, useRef, useState } from "react";
import { Leaf, Package, Tag, X } from "lucide-react";

import "./ProductCard.css";

function QuickViewModal({ product, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!product) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [product]);

  useEffect(() => {
    setImageError(false);
  }, [product?.id]);

  if (!product) return null;

  return (
    <div
      className="quick-view-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="quick-view-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        aria-describedby="quick-view-description"
      >
        <div className="quick-view-dialog__header">
          <div className="quick-view-dialog__brand">
            <span>
              <Leaf size={19} aria-hidden="true" />
            </span>
            <span>OrganicIntake</span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="quick-view-dialog__close"
            onClick={onClose}
            aria-label="Close product preview"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="quick-view-dialog__content">
          <div
            className={`quick-view-dialog__image ${
              imageError ? "is-error" : ""
            }`}
          >
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImageError(true)}
              />
            ) : (
              <Leaf size={42} aria-hidden="true" />
            )}
          </div>

          <div className="quick-view-dialog__details">
            <div className="quick-view-dialog__badges">
              <span className="quick-view-dialog__category">
                {product.category}
              </span>

              {product.featured && (
                <span className="quick-view-dialog__featured">
                  Featured
                </span>
              )}
            </div>

            <h2 id="quick-view-title">{product.name}</h2>

            <p
              id="quick-view-description"
              className="quick-view-dialog__description"
            >
              {product.description}
            </p>

            <p className="quick-view-dialog__price">
              {product.priceLabel}
            </p>

            <p className="quick-view-dialog__disclaimer">
              Illustrative demo product and pricing.
            </p>

            <div className="quick-view-dialog__info">
              <div>
                <Package size={20} aria-hidden="true" />
                <span>
                  <strong>Package / unit</strong>
                  <small>{product.packageSize}</small>
                </span>
              </div>

              <div>
                <Tag size={20} aria-hidden="true" />
                <span>
                  <strong>Category</strong>
                  <small>{product.category}</small>
                </span>
              </div>
            </div>

            {product.tags?.length > 0 && (
              <div className="quick-view-dialog__tags">
                {product.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}

            <button
              type="button"
              className="button button-primary quick-view-dialog__done"
              onClick={onClose}
            >
              Close Preview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuickViewModal;