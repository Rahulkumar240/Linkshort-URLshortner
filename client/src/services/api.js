const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

// Backend integration examples to connect after your server routes are finalized:
// export const shortenUrl = (payload) => apiRequest("/url", { method: "POST", body: JSON.stringify(payload) });
// export const fetchMyLinks = () => apiRequest("/url/my-links");
