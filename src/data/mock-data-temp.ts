import { Code, ShoppingCart, Layers, Globe, Mail, Wrench } from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Custom Web Application Development",
    description:
      "Transform your ideas into reality with custom web applications designed for scalability, efficiency, and user engagement.",
    price: 499,
    icon: Code, // Represents coding/development
    image: "/portfolio-images/clicks.jpg?height=200&width=300",
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
    metaTitle: "Custom Web Application Development | Rajon Dey",
    metaDescription:
      "Hire Rajon Dey for custom web application development using React, Next.js, and Node.js. Scalable and efficient solutions for your business.",
  },
  {
    id: 2,
    title: "E-Commerce Website Development",
    description:
      "Build high-performing online stores with seamless user experiences, secure payment gateways, and robust inventory management.",
    price: 799,
    icon: ShoppingCart, // Represents e-commerce
    image: "/portfolio-images/coinic.jpg?height=200&width=300",
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
    metaTitle: "E-Commerce Website Development | Rajon Dey",
    metaDescription:
      "Expert e-commerce website development by Rajon Dey. Build your online store with Shopify, WooCommerce, or custom solutions.",
  },
  {
    id: 3,
    title: "Headless CMS Website Development",
    description:
      "Develop modern, content-rich websites using headless CMS platforms for flexibility, scalability, and faster performance.",
    price: 699,
    icon: Layers, // Represents layered/headless architecture
    image: "/portfolio-images/clicks.jpg?height=200&width=300",
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
    metaTitle: "Headless CMS Website Development | Rajon Dey",
    metaDescription:
      "Flexible and scalable headless CMS websites by Rajon Dey using Contentful, Strapi, and Next.js for modern content management.",
  },
  {
    id: 4,
    title: "WordPress Website Development",
    description:
      "Design and develop custom WordPress websites with tailored themes, plugins, and functionalities to meet your business goals.",
    price: 499,
    icon: Globe,
    image: "/portfolio-images/debtify.jpg?height=200&width=300",
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
    metaTitle: "WordPress Website Development | Rajon Dey",
    metaDescription:
      "Custom WordPress websites by Rajon Dey with tailored themes and plugins. SEO-optimized and performance-tuned for your business.",
  },
  {
    id: 5,
    title: "Email Template Development",
    description:
      "Design and code responsive email templates that work across all devices and email clients, ensuring your campaigns look professional and engaging.",
    price: 199,
    icon: Mail, // Represents email
    image: "/portfolio-images/rsvp-email.jpg?height=200&width=300",
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
    metaTitle: "Email Template Development | Rajon Dey",
    metaDescription:
      "Responsive email templates by Rajon Dey. Professional designs compatible with Gmail, Outlook, and more for your campaigns.",
  },
  {
    id: 6,
    title: "Website Maintenance & Consultation",
    description:
      "Ensure your website remains secure, up-to-date, and optimized with ongoing maintenance and expert consultation services.",
    price: 299,
    icon: Wrench, // Represents maintenance/repair
    image: "/portfolio-images/hypo-hosting.jpg?height=200&width=300",
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
    metaTitle: "Website Maintenance & Consultation | Rajon Dey",
    metaDescription:
      "Website maintenance and consultation by Rajon Dey. Keep your site secure and optimized with expert support.",
  },
];

export const portfolio = [
  {
    id: 1,
    title: "Social Media Platform",
    description:
      "A dynamic social media app with real-time sharing and user engagement features.",
    image: "/portfolio-images/clicks.jpg",
    category: "Web Application",
    technologies: ["React", "Sanity", "Tailwind", "MongoDB"],
    client: "N/A",
    completionDate: "2022",
    features: [
      "Real-time post sharing",
      "User authentication",
      "Responsive design",
      "Sanity CMS integration",
    ],
    liveLink: "https://rdc-clicks.netlify.app/",
    githubLink: "https://github.com/RajonDey/clicks-project",
    metaTitle: "Clicks, a Social Media Platform | Rajon Dey",
    metaDescription:
      "Explore Rajon Dey's Clicks social media app with React and Sanity.",
  },
  {
    id: 2,
    title: "Web 3.0 Blockchain Project",
    description:
      "A Web 3.0 app enabling decentralized transactions with blockchain technology.",
    image: "/portfolio-images/coinic.jpg",
    category: "Web Application",
    technologies: ["React", "Solidity", "Alchemy", "Hardhat", "Ghiphy"],
    client: "N/A (Learning Project)",
    completionDate: "2022",
    features: [
      "Decentralized transactions",
      "Smart contract integration",
      "Real-time data updates",
      "Responsive UI",
    ],
    liveLink: "https://rdc-coinic.netlify.app/",
    githubLink: "https://github.com/RajonDey/coinic-project",
    metaTitle: "Coinic, Web 3.0 Blockchain Project | Rajon Dey",
    metaDescription:
      "Discover Rajon Dey's Coinic Web 3.0 blockchain project with React.",
  },
  {
    id: 3,
    title: "Powerful AI Platform Landing Page",
    description:
      "A sleek landing page for an AI platform with optimized user engagement.",
    image: "/portfolio-images/debtify.jpg",
    category: "Web Design",
    technologies: ["HTML", "Tailwind CSS"],
    client: "N/A",
    completionDate: "2021",
    features: [
      "AI-driven design elements",
      "Responsive layout",
      "Fast load times",
      "SEO optimization",
    ],
    liveLink: "https://rajondey.github.io/projects/debtify/",
    githubLink: "https://github.com/RajonDey/projects",
    metaTitle: "Debtify, A Powerful AI Platform Landing Page | Rajon Dey",
    metaDescription:
      "See Rajon Dey's Debtify AI platform landing page with Tailwind CSS.",
  },
  {
    id: 4,
    title: "Hosting Platform Website",
    description:
      "A modern hosting platform site with robust cloud hosting features.",
    image: "/portfolio-images/hypo-hosting.jpg",
    category: "Web Development",
    technologies: ["Bootstrap"],
    client: "N/A (Learning Project)",
    completionDate: "2021",
    features: [
      "Cloud hosting solutions",
      "Responsive design",
      "Fast performance",
      "User-friendly UI",
    ],
    liveLink: "https://rajondey.github.io/Portfolios/Hypohonting/",
    githubLink: "https://github.com/RajonDey/Portfolios",
    metaTitle: "Hypo Hosting, A Hosting Platform Website | Rajon Dey",
    metaDescription:
      "View Rajon Dey's Hypo Hosting platform site with Bootstrap.",
  },
  {
    id: 5,
    title: "Invitation Email Template",
    description:
      "A professional email template for event invitations with responsive design.",
    image: "/portfolio-images/rsvp-email.jpg",
    category: "Email Development",
    technologies: ["HTML", "CSS"],
    client: "CVS Health",
    completionDate: "2021",
    features: [
      "Responsive email layout",
      "Event RSVP functionality",
      "Cross-client compatibility",
      "Clean design",
    ],
    liveLink: "https://rajondey.github.io/projects/emails/RSVP/Vaux/",
    githubLink: "https://github.com/RajonDey/projects/tree/master/emails",
    metaTitle: "RSVP, An Invitation Email Template | Rajon Dey",
    metaDescription:
      "Check Rajon Dey's RSVP email template for CVS Health events.",
  },
];

export const blogPosts = [
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

export const staticPages = {
  home: {
    metaTitle: "Rajon Dey | Software Developer",
    metaDescription:
      "Hire Rajon Dey, a software developer for custom web apps, e-commerce, and full-stack solutions with Next.js & React. High-quality services—contact me now!",
  },
  services: {
    metaTitle: "Software Development Services | Rajon Dey",
    metaDescription:
      "Need custom software, web apps, or e-commerce platforms? Rajon Dey offers expert Next.js, React, and Node.js development services for your business. Contact me!",
  },
  portfolio: {
    metaTitle: "Portfolio | Rajon Dey Software Development",
    metaDescription:
      "See Rajon Dey's software development portfolio: web apps, e-commerce platforms, and more built with Next.js, React, and Node.js. Hire me for your next project!",
  },
  blog: {
    metaTitle: "Blog & Learn | Tutorials & Resources | Rajon Dey",
    metaDescription:
      "Learn software development with Rajon Dey's blog and learning resources: Next.js, React, databases, and full-stack tutorials for developers. Stay updated with the latest tips and tricks!",
  },
  order: {
    metaTitle: "Order Services | Rajon Dey Web Development",
    metaDescription:
      "Order custom web development services with interactive pricing calculator. Choose your features and get instant quotes for React, Next.js, e-commerce, and more.",
  },
  faq: {
    metaTitle: "FAQ | Rajon Dey Software Development Services",
    metaDescription:
      "Got questions? Find answers about Rajon Dey's software development services, pricing, and process. Contact me for custom Next.js and React solutions!",
  },
  contact: {
    metaTitle: "Contact Rajon Dey | Software Developer",
    metaDescription:
      "Contact Rajon Dey for expert software development services: custom apps, e-commerce, and more with Next.js & React. Book a free consultation today!",
  },
};

export const reviews = [
  {
    name: "Alex Smith",
    rating: 5,
    platform: "Fiverr",
    comment:
      "Excellent work! Delivered the project on time and with great quality.",
    date: "2 weeks ago",
    avatar: "/avatar-1.svg",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    platform: "Fiverr",
    comment:
      "Very professional and skilled developer. Would definitely work with again!",
    date: "1 month ago",
    avatar: "/avatar-2.svg",
  },
];

export const faqs = [
  {
    question: "What types of development services do you offer?",
    answer:
      "I provide a range of services including:<ul><li>Custom web application development</li><li>E-commerce solutions</li><li>Headless CMS websites</li><li>WordPress development</li><li>Email template design</li><li>Website maintenance</li></ul>Whether you need a full-stack project or a specific feature, I've got you covered!",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on complexity. For example:<ul><li>A simple landing page: 1-2 weeks</li><li>A full e-commerce platform: 4-8 weeks</li></ul>I'll provide a detailed timeline after discussing your requirements.",
  },
  {
    question: "What is your development process?",
    answer:
      "My process includes:<ol><li><strong>Discovery</strong>: Understanding your needs</li><li><strong>Planning</strong>: Outlining scope and timeline</li><li><strong>Development</strong>: Coding with regular updates</li><li><strong>Testing</strong>: Ensuring quality</li><li><strong>Delivery</strong>: Launching your project with support</li></ol>I keep you informed every step of the way.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes! I offer maintenance packages that can include:<ul><li>Bug fixes</li><li>Feature additions</li><li>Performance tweaks</li></ul>Support is tailored to your needs to keep your site updated and secure.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing varies by project scope. Examples include:<ul><li>Email templates: Starting at $199</li><li>Custom web applications: Starting at $499</li></ul>I'll provide a detailed quote after our consultation to match your budget and goals.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "I'm skilled in modern stacks and platforms like:<ul><li>React</li><li>Next.js</li><li>Node.js</li><li>Three.js</li><li>Shopify</li><li>WordPress</li><li>Headless CMS (Contentful, Strapi)</li></ul>I choose the best tools for your project.",
  },
  {
    question: "Can you work with my existing website or codebase?",
    answer:
      "Absolutely! I can:<ul><li>Enhance your current site</li><li>Fix issues</li><li>Integrate new features</li></ul>Just let me know what you're working with, and I'll adapt to your setup.",
  },
  {
    question: "How do I get started?",
    answer:
      "It's simple:<ol><li>Contact me via the <a href='/contact' class='text-green-500 hover:underline'>contact page</a></li><li>Message me on WhatsApp (+880 1737-997143)</li><li>Book a free consultation on <a href='https://calendly.com/rajondey' target='_blank' rel='noopener noreferrer' class='text-green-500 hover:underline'>Calendly</a></li></ol>We'll discuss your project, and I'll get you a proposal within 24-48 hours!",
  },
];
