import BlogClient from "./BlogClient";

async function getBlogs() {
  const res = await fetch("http://143.110.244.163:5000/api/blogs", {
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