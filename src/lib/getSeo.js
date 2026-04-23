import { fetchJson } from "./api";
import { getPublicAssetUrl, toAbsoluteUrl } from "./site";

export async function getSeo(page) {
  try {
    const data = await fetchJson(`/api/seo/${page}`, { cache: "no-store" });
    const seo = data?.seo || {};

    return {
      title: seo.title || "Dhakad Matrimony",
      description: seo.description || "Find your perfect match",
      keywords: seo.keywords || "",
      openGraph: {
        title: seo.ogTitle || seo.title || "Dhakad Matrimony",
        description: seo.ogDescription || seo.description || "Find your perfect match",
        images: seo.ogImage
          ? [seo.ogImage]
          : [toAbsoluteUrl(getPublicAssetUrl("/assets/images/dhakadlogo.png"))],
      },
    };
  } catch {
    return {
      title: "Dhakad Matrimony",
      description: "Find your perfect match",
    };
  }
}
