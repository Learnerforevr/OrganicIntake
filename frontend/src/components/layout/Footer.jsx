import { Link } from "react-router-dom";
import { ArrowUpRight, Leaf } from "lucide-react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand-column">
            <Link to="/" className="site-footer__brand">
              <span className="site-footer__brand-icon">
                <Leaf size={22} aria-hidden="true" />
              </span>

              <span>OrganicIntake</span>
            </Link>

            <p className="site-footer__mission">
              Thoughtful food choices. A simpler everyday experience.
            </p>
          </div>

          <div className="site-footer__column">
            <h2>Explore</h2>

            <Link to="/">Home</Link>
            <Link to="/#categories">Categories</Link>
            <Link to="/#about">About Us</Link>
            <Link to="/products">Products</Link>
          </div>

          <div className="site-footer__column">
            <h2>Your Account</h2>

            <Link to="/auth">Login</Link>
            <Link to="/auth?mode=register">Register</Link>

            <Link to="/products" className="site-footer__explore-link">
              Browse Products
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} OrganicIntake. Demo application.
          </p>

          <p>Thoughtfully chosen, simply explored.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;