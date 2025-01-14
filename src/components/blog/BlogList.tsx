import React from "react";
import BlogCard from "@/components/blog/BlogCard";

const BlogList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
