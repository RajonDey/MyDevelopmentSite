import React from "react";

const BlogCard = ({ post }) => {
  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <p>{post.excerpt.rendered}</p>
    </div>
  );
};

export default BlogCard;
