import { BlogPost } from "../../types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building a Performant E-commerce Site with Next.js",
    excerpt:
      "Learn how to create a fast, scalable e-commerce platform using Next.js, Tailwind CSS, and server-side rendering.",
    date: "January 15, 2024",
    slug: "building-ecommerce-nextjs",
    image: "/development-blog-placeholder.png?height=200&width=300",
    content: `...`, // unchanged
    metaTitle: "Building E-commerce Sites with Next.js | Rajon Dey",
    metaDescription:
      "Learn to build a fast e-commerce site with Next.js and Tailwind CSS. Rajon Dey's guide to scalable online stores.",
  },
  {
    id: 2,
    title: "Mastering React Hooks for State Management",
    excerpt:
      "A deep dive into React Hooks like useState and useEffect, with practical examples for managing state in modern apps.",
    date: "March 10, 2024",
    slug: "mastering-react-hooks",
    image: "/development-blog-placeholder.png?height=200&width=300",
    content: `...`, // unchanged
    metaTitle: "Mastering React Hooks | Rajon Dey",
    metaDescription:
      "Rajon Dey's guide to mastering React Hooks like useState and useEffect for efficient state management.",
  },
  {
    id: 3,
    title: "Creating a Headless CMS Blog with Strapi and Next.js",
    excerpt:
      "Step-by-step guide to building a blog using Strapi as a headless CMS and Next.js for the front-end.",
    date: "June 20, 2024",
    slug: "headless-cms-strapi-nextjs",
    image: "/development-blog-placeholder.png?height=200&width=300",
    content: `...`, // unchanged
    metaTitle: "Headless CMS Blog with Strapi & Next.js | Rajon Dey",
    metaDescription:
      "Build a headless CMS blog with Strapi and Next.js. Rajon Dey's step-by-step development tutorial.",
  },
];
