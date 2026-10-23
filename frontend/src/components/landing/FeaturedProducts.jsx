import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import products from "../../data/products.js";

function FeaturedProducts() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="section featured-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A few of our favorites</p>

            <h2 className="section-heading__title">
              A fresh place to start.
            </h2>
          </div>

          <Link
            to="/products"
            className="text-link featured-section__view-all"
          >
            View All Products
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products?category=${product.categorySlug}&preview=${product.id}`}
              className="featured-card"
              aria-label={`Preview ${product.name}`}
            >
              <div className="featured-card__image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />

                <span className="featured-card__badge">
                  Featured
                </span>

                <span className="featured-card__open">
                  <ArrowUpRight size={19} aria-hidden="true" />
                </span>
              </div>

              <div className="featured-card__content">
                <p className="featured-card__category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <div className="featured-card__price-row">
                  <span className="featured-card__price">
                    {product.priceLabel}
                  </span>

                  <span className="featured-card__package">
                    {product.packageSize}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="featured-section__mobile-link">
          <Link to="/products" className="button button-secondary">
            View All Products
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;