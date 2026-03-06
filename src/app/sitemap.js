export default async function sitemap() {

  const res = await fetch(
    "http://143.110.244.163:5000/api/blogs"
  );

  const data = await res.json();

  const blogs = data.blogs || [];

  const blogUrls = blogs.map((blog) => ({
    url: `https://dhakadmatrimony.com/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));

  return [
    {
      url: "https://dhakadmatrimony.com",
      lastModified: new Date(),
    },
    {
      url: "https://dhakadmatrimony.com/blog",
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}