import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Leaf, Menu, X } from "lucide-react";

import "./Header.css";

function Header({ variant = "home" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = variant === "home";
  const isAuth = variant === "auth";

  const closeMenu = () => setIsMenuOpen(false);

  // Close the mobile menu after navigation.
  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.search]);

  // Support closing the mobile menu with Escape.
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={`site-header site-header--${variant}`}>
      <div className="site-header__inner container">
        <Link
          to="/"
          className="site-brand"
          aria-label="OrganicIntake home"
          onClick={closeMenu}
        >
          <span className="site-brand__icon">
            <Leaf size={22} aria-hidden="true" />
          </span>

          <span className="site-brand__name">
            Organic<span>Intake</span>
          </span>
        </Link>

        <nav
          id="primary-navigation"
          className={`site-header__nav ${
            isMenuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          {isHome ? (
            <>
              <Link to="/" className="site-header__link" onClick={closeMenu}>
                Home
              </Link>

              <a
                href="#categories"
                className="site-header__link"
                onClick={closeMenu}
              >
                Categories
              </a>

              <a
                href="#about"
                className="site-header__link"
                onClick={closeMenu}
              >
                About
              </a>
            </>
          ) : !isAuth ? (
            <>
              <Link to="/" className="site-header__link" onClick={closeMenu}>
                Home
              </Link>

              <Link
                to="/products"
                className="site-header__link"
                onClick={closeMenu}
              >
                Products
              </Link>
            </>
          ) : null}

          <div className="site-header__actions">
            {isAuth ? (
              <Link
                to="/products"
                className="site-header__back-link"
                onClick={closeMenu}
              >
                <ArrowRight size={17} aria-hidden="true" />
                Back to Products
              </Link>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="site-header__link"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                {isHome && (
                  <Link
                    to="/products"
                    className="button button-primary site-header__cta"
                    onClick={closeMenu}
                  >
                    Explore Products
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>

        {!isAuth && (
          <button
            type="button"
            className="site-header__toggle"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;