import BlogClient from "./BlogClient";
import { buildApiUrl } from "@/lib/api";

async function getBlogs() {
  const res = await fetch(buildApiUrl("/api/blogs"), {
    cache: "no-store",
  });

  const data = await res.json();
  return data?.blogs || [];
}

export const metadata = {
  title: "Dhakad Matrimony Blog",
  description: "Marriage tips and relationship advice",
};

export default async function Page() {

  const blogs = await getBlogs();

  return <BlogClient blogs={blogs} />;
}
