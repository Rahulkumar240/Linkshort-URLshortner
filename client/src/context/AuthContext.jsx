
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

async function apiRequest(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body
          ? { "Content-Type": "application/json" }
          : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Cannot connect to the backend. Please check your server."
    );
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Unexpected server response (${response.status}). Check backend route: ${endpoint}`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || `Request failed (${response.status})`
    );
  }

  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  // Verify existing login when application starts
  useEffect(() => {
    let active = true;

    const verifyUser = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        if (active) {
          setToken(null);
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await apiRequest("/api/users/me", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (!data.user) {
          throw new Error("Invalid user response from server.");
        }

        if (active) {
          setToken(savedToken);
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.error("Authentication verification failed:", error);

        if (active) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    verifyUser();

    return () => {
      active = false;
    };
  }, []);

  // Login
  const login = async (email, password) => {
    const data = await apiRequest("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!data.token || !data.user) {
      throw new Error("Login response is missing a token or user.");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // Register
  const register = async (name, email, password) => {
    const data = await apiRequest("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (!data.token || !data.user) {
      throw new Error("Registration response is missing a token or user.");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
