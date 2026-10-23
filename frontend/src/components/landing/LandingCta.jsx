import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

function LandingCta() {
  return (
    <section className="landing-cta section">
      <div className="container">
        <div className="landing-cta__panel">
          <div className="landing-cta__decoration" aria-hidden="true">
            <Leaf size={120} strokeWidth={0.8} />
          </div>

          <div className="landing-cta__content">
            <p className="eyebrow landing-cta__eyebrow">
              Your next discovery starts here
            </p>

            <h2>
              Ready to explore something good?
            </h2>

            <p>
              Browse our demo collection of food and
              grocery essentials at your own pace.
            </p>

            <Link to="/products" className="button landing-cta__button">
              Explore Products
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingCta;