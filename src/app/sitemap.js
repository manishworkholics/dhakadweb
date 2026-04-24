import { fetchJson } from "@/lib/api";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site";

export default async function sitemap() {
  const data = await fetchJson("/api/blogs", { cache: "no-store" }).catch(() => ({}));
  const blogs = data.blogs || [];

  const blogUrls = blogs.map((blog) => ({
    url: toAbsoluteUrl(`/blog/${blog.slug}`),
    lastModified: blog.updatedAt,
  }));

  return [
    {
      url: getSiteUrl(),
      lastModified: new Date(),
    },
    {
      url: toAbsoluteUrl("/terms-and-conditions"),
      lastModified: new Date(),
    },
    {
      url: toAbsoluteUrl("/privacy-policy"),
      lastModified: new Date(),
    },
    {
      url: toAbsoluteUrl("/blog"),
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
