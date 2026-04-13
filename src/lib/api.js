function normalizeBaseUrl(url) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getApiBaseUrl() {
  // Prefer server-only env in production, but keep NEXT_PUBLIC_* for client usage.
  const fromServer = process.env.API_BASE_URL;
  const fromPublic = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Backward-compatible default (matches existing SEO fetch host).
  const fallback = "http://143.110.244.163:5000";

  return normalizeBaseUrl(fromServer || fromPublic || fallback);
}

export function buildApiUrl(pathname) {
  const base = getApiBaseUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

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

