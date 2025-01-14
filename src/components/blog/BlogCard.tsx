import React from "react";

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <p>{post.excerpt.rendered}</p>
    </div>
  );
};

export default BlogCard;
