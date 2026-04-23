function trimTrailingSlash(value = "") {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getBasePath() {
  return trimTrailingSlash(process.env.NEXT_PUBLIC_BASE_PATH || "");
}

export function withBasePath(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const basePath = getBasePath();
  return `${basePath}${normalizedPath}` || normalizedPath;
}

export function getSiteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_BASE_URL || "https://dhakadmatrimony.com";

  return trimTrailingSlash(configured);
}

export function toAbsoluteUrl(pathname = "/") {
  return `${getSiteUrl()}${withBasePath(pathname)}`;
}

export function getPublicAssetUrl(assetPath = "") {
  return withBasePath(assetPath.startsWith("/") ? assetPath : `/${assetPath}`);
}
