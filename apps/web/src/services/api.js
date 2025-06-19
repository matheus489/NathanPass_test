// Serviço centralizado para chamadas à API REST do backend

export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

async function request(method, url, data) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };
  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${API_BASE}${url}`, options);
  if (!res.ok) {
    let errorObj = { message: "Erro desconhecido" };
    try {
      const err = await res.json();
      errorObj = {
        message: err.error || err.message || "Erro desconhecido",
        errors: err.errors || [],
      };
    } catch {}
    throw errorObj;
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (url) => request("GET", url),
  post: (url, data) => request("POST", url, data),
  put: (url, data) => request("PUT", url, data),
  delete: (url) => request("DELETE", url),
}; 