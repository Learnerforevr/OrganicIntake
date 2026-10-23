import { useEffect, useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import "./AuthForm.css";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthForm({ mode = "login", onModeChange }) {
  const navigate = useNavigate();
  const navigationTimer = useRef(null);

  const [form, setForm] = useState({ ...INITIAL_FORM });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const isRegister = mode === "register";

  // Reset temporary form state when switching modes.
  useEffect(() => {
    if (navigationTimer.current !== null) {
      window.clearTimeout(navigationTimer.current);
      navigationTimer.current = null;
    }

    setForm({ ...INITIAL_FORM });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsSubmitting(false);
    setStatus("");
  }, [mode]);

  // Clear any pending demo navigation if the component unmounts.
  useEffect(() => {
    return () => {
      if (navigationTimer.current !== null) {
        window.clearTimeout(navigationTimer.current);
      }
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      const next = { ...current };

      delete next[name];

      // Changing the password may invalidate confirmation.
      if (name === "password") {
        delete next.confirmPassword;
      }

      return next;
    });

    setStatus("");
  }

  function validateForm() {
    const nextErrors = {};

    if (isRegister && !form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Please enter a password.";
    } else if (isRegister && form.password.length < 8) {
      nextErrors.password =
        "Your password must contain at least 8 characters.";
    }

    if (isRegister && !form.confirmPassword) {
      nextErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      isRegister &&
      form.password !== form.confirmPassword
    ) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("");
      return;
    }

    // This is a frontend demonstration, not real authentication.
    setIsSubmitting(true);
    setStatus(
      "Demo form accepted. Opening the public product catalog..."
    );

    navigationTimer.current = window.setTimeout(() => {
      navigate("/products", {
        state: {
          demoAuthSuccess: true,
          authMode: mode,
        },
      });
    }, 350);
  }

  function switchMode(nextMode) {
    if (isSubmitting) return;
    onModeChange(nextMode);
  }

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <aside className="auth-card__aside">
        <div className="auth-card__aside-icon">
          <Leaf size={28} aria-hidden="true" />
        </div>

        <p className="auth-card__eyebrow">
          FOOD · GROCERIES · EVERYDAY LIVING
        </p>

        <h2>
          Good food.
          <span>Thoughtfully chosen.</span>
        </h2>

        <p className="auth-card__aside-description">
          A welcoming place to explore food and everyday
          grocery essentials, at your own pace.
        </p>

        <div className="auth-card__aside-note">
          <Leaf size={18} aria-hidden="true" />
          <span>Thoughtful choices, simply explored.</span>
        </div>

        <div className="auth-card__decoration" aria-hidden="true">
          <Leaf size={170} strokeWidth={0.6} />
        </div>
      </aside>

      <div className="auth-card__main">
        <div className="auth-card__heading">
          <p className="eyebrow">
            {isRegister ? "Join OrganicIntake" : "Your OrganicIntake"}
          </p>

          <h1 id="auth-title">
            {isRegister ? "Create an account" : "Welcome back"}
          </h1>

          <p>
            {isRegister
              ? "Fill in your details to continue exploring."
              : "Enter your details to continue exploring."}
          </p>
        </div>

        <div
          className="auth-mode-toggle"
          role="group"
          aria-label="Choose authentication form"
        >
          <button
            type="button"
            className={!isRegister ? "is-active" : ""}
            aria-pressed={!isRegister}
            onClick={() => switchMode("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={isRegister ? "is-active" : ""}
            aria-pressed={isRegister}
            onClick={() => switchMode("register")}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <div className="auth-field">
              <label htmlFor="fullName">Full name</label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
              />

              {errors.fullName && (
                <p className="auth-field__error" id="fullName-error">
                  {errors.fullName}
                </p>
              )}
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
            />

            {errors.email && (
              <p className="auth-field__error" id="email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="auth-field">
            <div className="auth-field__label-row">
              <label htmlFor="password">Password</label>

              {isRegister && (
                <span className="auth-field__hint">
                  At least 8 characters
                </span>
              )}
            </div>

            <div className="auth-password">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={
                  isRegister ? "new-password" : "current-password"
                }
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />

              <button
                type="button"
                className="auth-password__toggle"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
                disabled={isSubmitting}
              >
                {showPassword ? (
                  <EyeOff size={19} aria-hidden="true" />
                ) : (
                  <Eye size={19} aria-hidden="true" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="auth-field__error" id="password-error">
                {errors.password}
              </p>
            )}
          </div>

          {isRegister && (
            <div className="auth-field">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="auth-password">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                />

                <button
                  type="button"
                  className="auth-password__toggle"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                  aria-pressed={showConfirmPassword}
                  onClick={() =>
                    setShowConfirmPassword((visible) => !visible)
                  }
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} aria-hidden="true" />
                  ) : (
                    <Eye size={19} aria-hidden="true" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p
                  className="auth-field__error"
                  id="confirmPassword-error"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {status && (
            <p className="auth-form__status" role="status">
              {status}
            </p>
          )}

          <button
            type="submit"
            className="button button-primary auth-form__submit"
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting
                ? "Opening catalog..."
                : isRegister
                  ? "Create Demo Account"
                  : "Login"}
            </span>

            {!isSubmitting && (
              <ArrowRight size={18} aria-hidden="true" />
            )}
          </button>

          <p className="auth-form__disclaimer">
            Demo only. No account is created, verified, or stored.
          </p>
        </form>

        <div className="auth-card__browse">
          <span>Prefer to browse first?</span>
          <Link to="/products">Explore Products →</Link>
        </div>
      </div>
    </section>
  );
}

export default AuthForm;