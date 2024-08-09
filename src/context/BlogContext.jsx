import PropTypes from "prop-types";
import React, { useState } from "react";

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = () => {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/blogs/getBlog`;

    fetch(fetchUrl, {})
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No blog found") {
          setBlogs([]);
        } else {
          setBlogs(data.blogs);
        }
      });
  };

  return (
    <BlogContext.Provider value={{ blogs, fetchBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogContext;
