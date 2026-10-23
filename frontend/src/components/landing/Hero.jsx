import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero section">
      <div className="container hero__layout">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">
            Food · Groceries · Everyday Living
          </p>

          <h1 className="hero__title">
            Good food.
            <span>Thoughtfully chosen.</span>
          </h1>

          <p className="hero__description">
            Discover organic food and everyday grocery essentials
            in one welcoming marketplace. Find inspiration for
            your table and make browsing feel simple.
          </p>

          <div className="hero__actions">
            <Link to="/products" className="button button-primary">
              Explore Products
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <a href="#categories" className="button button-secondary">
              Explore Categories
            </a>
          </div>

          <div className="hero__note">
            <Leaf size={18} aria-hidden="true" />
            <span>
              Thoughtful choices for everyday living.
            </span>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="/images/branding/hero-collage.webp"
            alt="A collection of food and grocery products featured by OrganicIntake"
            fetchPriority="high"
          />

          <div className="hero__image-caption">
            <span className="hero__caption-icon">
              <Leaf size={18} aria-hidden="true" />
            </span>

            <div>
              <strong>Simple. Natural. Everyday.</strong>
              <span>Explore the marketplace</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;