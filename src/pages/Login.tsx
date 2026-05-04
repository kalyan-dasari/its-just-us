import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Error: Auth context not found</div>;
  }

  const { setIsAuthenticated } = authContext;

  // Hardcoded credentials
  const VALID_USERNAMES = ["sapna", "kalyan"];
  const VALID_PASSWORD = "Dreamed";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (VALID_USERNAMES.includes(username) && password === VALID_PASSWORD) {
        localStorage.setItem("authToken", btoa(`${username}:${password}`));
        localStorage.setItem("username", username);
        setIsAuthenticated(true);
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4a148c, #6a1b9a, #7b1fa2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "34rem",
          background: "linear-gradient(to bottom, rgba(60, 25, 111, 0.92), rgba(61, 26, 109, 0.88), rgba(75, 28, 107, 0.82))",
          border: "1px solid rgba(177, 98, 235, 0.28)",
          borderRadius: "2rem",
          padding: "2.25rem 2rem 1.9rem",
          boxShadow: "0 24px 55px rgba(95, 25, 152, 0.34)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontSize: "3.05rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "0.75rem",
              backgroundImage: "linear-gradient(to right, #ff1493, #ffc0cb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Kal Ka Sapna
          </h1>
          <p style={{ color: "#e1bee7", fontSize: "1.125rem" }}>Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", color: "white", fontWeight: "600", marginBottom: "0.75rem" }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you/me"
              style={{
                width: "100%",
                padding: "0.75rem 1.25rem",
                background: "rgba(106, 27, 154, 0.5)",
                border: "1px solid rgba(142, 36, 170, 0.3)",
                borderRadius: "0.75rem",
                color: "white",
              }}
              disabled={isLoading}
            />
          </div>

          <div>
            <label style={{ display: "block", color: "white", fontWeight: "600", marginBottom: "0.75rem" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem 1.25rem",
                background: "rgba(106, 27, 154, 0.5)",
                border: "1px solid rgba(142, 36, 170, 0.3)",
                borderRadius: "0.75rem",
                color: "white",
              }}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                color: "#fca5a5",
                padding: "1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: "linear-gradient(to right, #da2d93, #e91e63)",
              color: "white",
              fontWeight: "bold",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading ? "Entering..." : "Enter"}
          </button>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ color: "#ce93d8", fontSize: "0.875rem" }}>
            it's just us
          </p>
        </div>

        <p style={{ textAlign: "center", color: "#ce93d8", fontSize: "0.75rem", marginTop: "2rem" }}>
          💜 Since Nov 26, 2025
        </p>
      </div>
    </div>
  );
};
