import { useContext, useEffect } from "react";
import ViewBlogList from "../components/ViewBlogList";
import BlogContext from "../context/BlogContext";

export default function Blogs() {
  const { fetchBlogs } = useContext(BlogContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  return <ViewBlogList />;
}
