import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="placeholder-page">
      <p className="eyebrow">404 — Page Not Found</p>

      <h1>Looks like this page is missing.</h1>

      <p>
        The page you're looking for doesn't exist.
        Let's get you back to OrganicIntake.
      </p>

      <div className="placeholder-actions">
        <Link to="/" className="button button-primary">
          Return Home
        </Link>

        <Link to="/products" className="button button-secondary">
          Explore Products
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;