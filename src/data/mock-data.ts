export const services = [
  {
    id: 1,
    title: "Custom Web Application Development",
    description:
      "Transform your ideas into reality with custom web applications designed for scalability, efficiency, and user engagement.",
    price: 499,
    image: "/placeholder.svg?height=200&width=300",
    features: [
      "Responsive and interactive UI/UX",
      "Backend development with RESTful APIs or GraphQL",
      "Integration with third-party services",
      "Performance optimization",
    ],
    platforms: [],
    technologies: ["React", "Next.js", "Node.js", "Three.js"],
    faqs: [
      {
        question: "What technologies do you use?",
        answer:
          "I primarily use React, Next.js, Node.js, and Three.js to build modern and high-performance web applications.",
      },
      {
        question: "Do you offer ongoing support?",
        answer:
          "Yes, I provide maintenance and support packages to ensure your application runs smoothly after launch.",
      },
    ],
  },
  {
    id: 2,
    title: "E-Commerce Website Development",
    description:
      "Build high-performing online stores with seamless user experiences, secure payment gateways, and robust inventory management.",
    price: 799,
    image: "/placeholder.svg?height=200&width=300",
    features: [
      "Custom storefronts using Shopify, WooCommerce, or headless e-commerce solutions",
      "Payment gateway integration (Stripe, PayPal, etc.)",
      "Mobile-friendly and SEO-optimized designs",
    ],
    platforms: ["Shopify", "WooCommerce"],
    technologies: [],
    faqs: [
      {
        question: "Which platforms do you work with?",
        answer:
          "I specialize in Shopify, WooCommerce, and headless e-commerce solutions.",
      },
      {
        question: "Can you integrate payment gateways?",
        answer:
          "Yes, I can integrate payment gateways like Stripe, PayPal, and more.",
      },
    ],
  },
  {
    id: 3,
    title: "Headless CMS Website Development",
    description:
      "Develop modern, content-rich websites using headless CMS platforms for flexibility, scalability, and faster performance.",
    price: 699,
    image: "/placeholder.svg?height=200&width=300",
    features: [
      "Content management with platforms like Contentful or Strapi",
      "Dynamic content delivery via APIs",
      "Customizable front-end frameworks (React, Next.js)",
    ],
    platforms: ["Contentful", "Strapi", "Sanity"],
    technologies: ["React", "Next.js"],
    faqs: [
      {
        question: "What CMS platforms do you use?",
        answer: "I work with platforms like Contentful, Strapi, and Sanity.",
      },
      {
        question: "Can you customize the front-end?",
        answer:
          "Yes, I use React and Next.js to create fully customizable front-end experiences.",
      },
    ],
  },
  {
    id: 4,
    title: "WordPress Website Development",
    description:
      "Design and develop custom WordPress websites with tailored themes, plugins, and functionalities to meet your business goals.",
    price: 499,
    image: "/placeholder.svg?height=200&width=300",
    features: [
      "Custom theme development and customization",
      "Plugin integration and development",
      "SEO optimization and performance tuning",
    ],
    platforms: ["WordPress"],
    technologies: [],
    faqs: [
      {
        question: "Do you create custom themes?",
        answer:
          "Yes, I design and develop custom WordPress themes to match your brand.",
      },
      {
        question: "Can you optimize my WordPress site for SEO?",
        answer:
          "Absolutely! I ensure your site is optimized for search engines and performs well.",
      },
    ],
  },
  {
    id: 5,
    title: "Email Template Development",
    description:
      "Design and code responsive email templates that work across all devices and email clients, ensuring your campaigns look professional and engaging.",
    price: 199,
    image: "/placeholder.svg?height=200&width=300",
    features: [
      "Mobile-friendly and responsive designs",
      "Cross-client compatibility (Gmail, Outlook, Apple Mail, etc.)",
      "Custom branding and styling",
    ],
    platforms: [],
    technologies: [],
    faqs: [
      {
        question: "Are your email templates mobile-friendly?",
        answer:
          "Yes, all templates are designed to be fully responsive and work seamlessly on mobile devices.",
      },
      {
        question: "Do you test for email client compatibility?",
        answer:
          "Yes, I test templates across major email clients like Gmail, Outlook, and Apple Mail.",
      },
    ],
  },
  {
    id: 6,
    title: "Website Maintenance & Consultation",
    description:
      "Ensure your website remains secure, up-to-date, and optimized with ongoing maintenance and expert consultation services.",
    price: 299,
    image: "/placeholder.svg?height=200&width=300",
    features: [
      "Regular updates, backups, and security patches",
      "Performance monitoring and optimization",
      "Strategic advice on technology stack and scalability",
    ],
    platforms: [],
    technologies: [],
    faqs: [
      {
        question: "What does maintenance include?",
        answer:
          "Regular updates, backups, security patches, and performance optimization.",
      },
      {
        question: "Can you help with scaling my website?",
        answer:
          "Yes, I provide consultation on scaling your website and improving its architecture.",
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
