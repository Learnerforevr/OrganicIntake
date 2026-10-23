import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import AuthForm from "../components/auth/AuthForm.jsx";

function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode =
    searchParams.get("mode") === "register"
      ? "register"
      : "login";

  const handleModeChange = useCallback(
    (nextMode) => {
      const nextParams = new URLSearchParams(searchParams);

      if (nextMode === "register") {
        nextParams.set("mode", "register");
      } else {
        nextParams.delete("mode");
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  return (
    <>
      <Header variant="auth" />

      <main className="auth-page">
        <div className="auth-page__container">
          <AuthForm
            mode={mode}
            onModeChange={handleModeChange}
          />
        </div>
      </main>
    </>
  );
}

export default AuthPage;