import BlogDetailClient from "./BlogDetailClient";
import { buildApiUrl } from "@/lib/api";

async function getBlog(slug) {

  try {

    const res = await fetch(
      buildApiUrl(`/api/blogs/${slug}`),
      { cache: "no-store" }
    );

    const data = await res.json();

    return data?.blog || null;

  } catch (err) {

    return null;

  }

}

export async function generateMetadata({ params }) {

  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Dhakad Matrimony Blog",
      description: "Dhakad Matrimony Blog",
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
  };

}

export default async function Page({ params }) {

  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return <div className="container py-5 text-center">Blog not found</div>;
  }

  return <BlogDetailClient blog={blog} />;

}
