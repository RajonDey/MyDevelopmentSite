export const services = [
  {
    id: 1,
    title: "Next.js Web Development",
    description: "Custom web applications built with Next.js and React",
    price: 499,
    image: "/placeholder.svg?height=200&width=300",
    faqs: [
      {
        question: "What do I need to get started???",
        answer:
          "Just provide me with your project requirements, and I’ll take care of the rest!",
      },
      {
        question: "Do you offer revisions?",
        answer:
          "Yes, I offer unlimited revisions until you’re satisfied with the final product.",
      },
    ],
  },
  {
    id: 2,
    title: "Full Stack Development",
    description: "End-to-end web development solutions",
    price: 799,
    image: "/placeholder.svg?height=200&width=300",
    faqs: [
      {
        question: "What do I need to get started?",
        answer:
          "Just provide me with your project requirements, and I’ll take care of the rest!",
      },
      {
        question: "Do you offer revisions?",
        answer:
          "Yes, I offer unlimited revisions until you’re satisfied with the final product.",
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Modern and intuitive user interface design",
    price: 399,
    image: "/placeholder.svg?height=200&width=300",
    faqs: [
      {
        question: "What do I need to get started?",
        answer:
          "Just provide me with your project requirements, and I’ll take care of the rest!",
      },
      {
        question: "Do you offer revisions?",
        answer:
          "Yes, I offer unlimited revisions until you’re satisfied with the final product.",
      },
    ],
  },
  {
    id: 4,
    title: "Website Maintenance",
    description: "Ongoing support and maintenance services",
    price: 299,
    image: "/placeholder.svg?height=200&width=300",
    faqs: [
      {
        question: "What do I need to get started?",
        answer:
          "Just provide me with your project requirements, and I’ll take care of the rest!",
      },
      {
        question: "Do you offer revisions?",
        answer:
          "Yes, I offer unlimited revisions until you’re satisfied with the final product.",
      },
    ],
  },
];

export const portfolio = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online shopping platform built with Next.js",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    image: "/placeholder.svg?height=300&width=400",
    category: "UI/UX Design",
  },
];

export const reviews = [
  {
    name: "Alex Smith",
    rating: 5,
    comment:
      "Excellent work! Delivered the project on time and with great quality.",
    date: "2 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Very professional and skilled developer. Would definitely work with again!",
    date: "1 month ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "How to Build a Modern Website with Next.js",
    excerpt:
      "Learn how to build a fast and scalable website using Next.js and Tailwind CSS.",
    date: "October 10, 2023",
    slug: "how-to-build-a-modern-website-with-nextjs",
    image: "/placeholder.svg", // Add placeholder image
    content: `
      <p>Next.js is a powerful React framework that enables developers to build modern web applications with ease. In this guide, we'll walk you through the process of building a website using Next.js and Tailwind CSS.</p>
      <h2>Getting Started</h2>
      <p>First, create a new Next.js project by running the following command:</p>
      <pre><code>npx create-next-app@latest my-website</code></pre>
      <p>Next, install Tailwind CSS:</p>
      <pre><code>npm install -D tailwindcss postcss autoprefixer</code></pre>
      <p>Finally, configure Tailwind CSS by creating a <code>tailwind.config.js</code> file.</p>
    `,
  },
  {
    id: 2,
    title: "Top 5 Tools for Web Developers in 2023",
    excerpt: "Discover the best tools for web development in 2023.",
    date: "October 5, 2023",
    slug: "top-5-tools-for-web-developers-in-2023",
    image: "/placeholder.svg", // Add placeholder image
    content: `
      <p>Web development tools are constantly evolving. Here are the top 5 tools you should be using in 2023:</p>
      <h2>1. Next.js</h2>
      <p>Next.js is a React framework that makes it easy to build server-rendered and static websites.</p>
      <h2>2. Tailwind CSS</h2>
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs quickly.</p>
      <h2>3. TypeScript</h2>
      <p>TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain.</p>
      <h2>4. VSCode</h2>
      <p>Visual Studio Code is a lightweight but powerful code editor with excellent support for web development.</p>
      <h2>5. Figma</h2>
      <p>Figma is a design tool that makes it easy to create and collaborate on UI/UX designs.</p>
    `,
  },
];
