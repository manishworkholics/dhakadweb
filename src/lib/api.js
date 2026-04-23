import axios from "axios";

function normalizeBaseUrl(url) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getApiBaseUrl() {
  const fromServer = process.env.API_BASE_URL;
  const fromPublic =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return normalizeBaseUrl(fromServer || fromPublic || siteUrl || "");
}

export function buildApiUrl(pathname) {
  const base = getApiBaseUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function getApiOrigin() {
  return getApiBaseUrl().replace(/\/api$/, "");
}

export function buildSocketUrl(pathname = "") {
  const origin = getApiOrigin();
  if (!pathname) return origin;

  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}

export function getStoredToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("usertoken") || "";
}

export function buildAuthHeaders(headers = {}, token = getStoredToken()) {
  if (!token) return headers;

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}

export const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const nextConfig = { ...config };
  const url = nextConfig.url || "";

  if (url.startsWith("/")) {
    nextConfig.url = buildApiUrl(url);
  }

  nextConfig.headers = buildAuthHeaders(nextConfig.headers || {});
  return nextConfig;
});

export async function fetchJson(pathname, init = {}) {
  const url = buildApiUrl(pathname);
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });

  let json;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    const message =
      json?.message ||
      json?.error ||
      `Request failed (${res.status} ${res.statusText})`;
    const err = new Error(message);
    err.status = res.status;
    err.url = url;
    err.body = json;
    throw err;
  }

  return json;
}

