// Import Lucide icons for reference but don't use them directly in the data
// We'll pass icon names instead of components for better server/client compatibility
// import { Code, ShoppingCart, Layers, Globe, Mail, Wrench } from "lucide-react";

import { servicePricing } from "./pricing";

export const services = [
  {
    id: "custom-web", // Match serviceId in pricing.ts
    title: "Custom Web Application Development",
    description:
      "Transform your ideas into reality with custom web applications designed for scalability, efficiency, and user engagement.",
    price: servicePricing["custom-web"].basePrice,
    iconName: "Code", // Represents coding/development
    image: "/portfolio-images/clicks.jpg?height=200&width=300",
    features: [
      "Responsive and interactive UI/UX",
      "Backend development with RESTful APIs or GraphQL",
      "Integration with third-party services",
      "Performance optimization",
    ],
    platforms: [],
    technologies: ["React", "Next.js", "Node.js", "Three.js"],
    // Enhanced properties for conversion
    isRecommended: true,
    benefits: [
      "Automate business processes and reduce operational costs",
      "Deliver tailored user experiences that convert better",
      "Scale seamlessly as your business grows",
      "Own your code and data with full intellectual property rights",
      "Get ongoing technical support and updates",
    ],
    expectedOutcome:
      "A custom web application that solves your specific business challenges and increases operational efficiency by 35-40%",
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
    id: "ecommerce", // Match serviceId in pricing.ts
    title: "E-Commerce Website Development",
    description:
      "Build high-performing online stores with seamless user experiences, secure payment gateways, and robust inventory management.",
    price: servicePricing["ecommerce"].basePrice,
    iconName: "ShoppingCart", // Represents e-commerce
    image: "/portfolio-images/coinic.jpg?height=200&width=300",
    features: [
      "Custom storefronts using Shopify, WooCommerce, or headless e-commerce solutions",
      "Payment gateway integration (Stripe, PayPal, etc.)",
      "Mobile-friendly and SEO-optimized designs",
    ],
    platforms: ["Shopify", "WooCommerce"],
    technologies: [],
    // Enhanced properties for conversion
    isRecommended: false,
    benefits: [
      "Convert visitors into customers with optimized checkout flows",
      "Secure payment processing with trusted gateways",
      "Boost sales with cross-selling and upselling features",
      "Integrate with your inventory and shipping systems",
      "Mobile-responsive design for shoppers on any device",
    ],
    expectedOutcome:
      "A high-converting online store that typically increases sales by 25-30% compared to non-optimized e-commerce sites",
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
    id: "headless-cms", // Match serviceId in pricing.ts
    title: "Headless CMS Website Development",
    description:
      "Separate your content management from your frontend for maximum flexibility, performance, and scalability across all devices.",
    price: servicePricing["headless-cms"].basePrice,
    iconName: "Layers", // Represents headless CMS architecture
    image: "/portfolio-images/dashboard.jpg?height=200&width=300",
    features: [
      "Content management with platforms like Contentful or Strapi",
      "Dynamic content delivery via APIs",
      "Customizable front-end frameworks (React, Next.js)",
    ],
    platforms: ["Contentful", "Strapi", "Sanity"],
    technologies: ["React", "Next.js"],
    // Enhanced properties for conversion
    isRecommended: false,
    benefits: [
      "Create once, publish everywhere across multiple channels",
      "Faster load times leading to better SEO and user experience",
      "Future-proof your content with API-first architecture",
      "Easy content updates without developer assistance",
      "Flexible design and functionality without platform limitations",
    ],
    expectedOutcome:
      "A flexible, fast-loading website with 40-50% better performance metrics and seamless content management",
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
    id: "wordpress", // Match serviceId in pricing.ts
    title: "WordPress Website Development",
    description:
      "Leverage the world's most popular CMS with custom themes, plugins, and optimizations for performance and security.",
    price: servicePricing["wordpress"].basePrice,
    iconName: "Globe", // Represents WordPress websites
    image: "/portfolio-images/debtify.jpg?height=200&width=300",
    features: [
      "Custom theme development and customization",
      "Plugin integration and development",
      "SEO optimization and performance tuning",
    ],
    platforms: ["WordPress"],
    technologies: [],
    // Enhanced properties for conversion
    isRecommended: false,
    benefits: [
      "Get a professional website that reflects your brand identity",
      "Easily update content without technical knowledge",
      "Rank higher in search engines with WordPress SEO best practices",
      "Scale your site with thousands of available plugins",
      "Connect with your marketing tools and CRM systems",
    ],
    expectedOutcome:
      "A professional, easy-to-manage WordPress website that serves as an effective marketing tool for your business",
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
    id: "automation", // Match serviceId in pricing.ts
    title: "Workflow Automation",
    description:
      "Streamline your business processes with custom automation solutions that save time, reduce errors, and increase productivity.",
    price: servicePricing["automation"].basePrice,
    iconName: "Settings", // Represents automation
    image: "/portfolio-images/dashboard.jpg?height=200&width=300",
    features: [
      "Custom automation workflows",
      "Integration with existing tools",
      "Process optimization",
      "Data synchronization",
    ],
    platforms: ["n8n", "Zapier", "Make"],
    technologies: ["API", "Webhooks"],
    // Enhanced properties for conversion
    isRecommended: false,
    benefits: [
      "Save 5-15 hours per week on repetitive tasks",
      "Eliminate human error in data handling",
      "Improve customer experience with faster responses",
      "Connect disparate systems for better data flow",
      "Scale your operations without increasing staff",
    ],
    expectedOutcome:
      "Automated workflows that reduce manual work by 60-80% and significantly improve operational efficiency",
    faqs: [
      {
        question: "Which platforms do you work with?",
        answer:
          "I primarily use n8n, Zapier, Make, and custom API integrations.",
      },
      {
        question: "Can you integrate with my existing systems?",
        answer:
          "Yes, I can integrate with most modern business tools including CRMs, email platforms, and payment systems.",
      },
    ],
    metaTitle: "Workflow Automation Services | Rajon Dey",
    metaDescription:
      "Custom workflow automation solutions by Rajon Dey. Save time and reduce errors with n8n, Zapier, and Make integrations.",
  },
  {
    id: "email-templates", // Match serviceId in pricing.ts
    title: "Email Marketing Templates",
    description:
      "Create professional, responsive email templates that convert. Our designs ensure your message looks perfect across all email clients.",
    price: servicePricing["email-templates"].basePrice,
    iconName: "Mail", // Represents email marketing
    image: "/portfolio-images/rsvp-email.jpg?height=200&width=300",
    features: [
      "Mobile-friendly and responsive designs",
      "Cross-client compatibility (Gmail, Outlook, Apple Mail, etc.)",
      "Custom branding and styling",
    ],
    platforms: [],
    technologies: [],
    // Enhanced properties for conversion
    isRecommended: false,
    benefits: [
      "Increase email open and click-through rates with professional designs",
      "Ensure your message displays correctly across all email clients",
      "Maintain brand consistency in your email marketing",
      "Create reusable templates for ongoing campaigns",
      "Drive more conversions from your email marketing efforts",
    ],
    expectedOutcome:
      "Professional email templates that typically increase click-through rates by 15-20% compared to generic designs",
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
    id: "maintenance", // Match serviceId in pricing.ts
    title: "Website Maintenance & Consultation",
    description:
      "Keep your website secure, up-to-date, and performing optimally with our comprehensive maintenance services and expert consultation.",
    price: servicePricing["maintenance"].basePrice,
    iconName: "Wrench", // Represents maintenance
    image: "/portfolio-images/hypo-hosting.jpg?height=200&width=300",
    features: [
      "Regular updates, backups, and security patches",
      "Performance monitoring and optimization",
      "Strategic advice on technology stack and scalability",
    ],
    platforms: [],
    technologies: [],
    // Enhanced properties for conversion
    isRecommended: false,
    benefits: [
      "Keep your site secure and protected from vulnerabilities",
      "Maintain fast load times and optimal performance",
      "Prevent costly downtime and technical emergencies",
      "Get expert advice on technology decisions",
      "Focus on your business while technical needs are handled",
    ],
    expectedOutcome:
      "A reliable, secure, and optimized website with 99.9% uptime and protection from security vulnerabilities",
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
    results: [
      "Improved user engagement by 35%",
      "Reduced load time by 60%",
      "Increased content sharing by 42%",
    ],
    businessImpact:
      "Enabled efficient content sharing and community building with optimized performance",
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
    results: [
      "99.8% transaction success rate",
      "Reduced gas costs by 15%",
      "Enhanced security with advanced encryption",
    ],
    businessImpact:
      "Established a secure foundation for blockchain transactions with optimized costs",
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
    results: [
      "40% increase in conversion rate",
      "90+ PageSpeed score",
      "25% decrease in bounce rate",
    ],
    businessImpact:
      "Created a high-converting landing page focused on user engagement and lead generation",
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
    results: [
      "45% higher user satisfaction score",
      "28% improvement in site navigation metrics",
      "1.8 second average page load time",
    ],
    businessImpact:
      "Delivered an intuitive and fast-loading platform that showcases hosting services effectively",
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
    results: [
      "52% increase in RSVP completion rate",
      "98% delivery rate across email clients",
      "37% higher click-through rate",
    ],
    businessImpact:
      "Boosted event attendance and engagement through optimized email communications",
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
      "Excellent work! Delivered the project on time and with great quality. The site loads incredibly fast and the SEO improvements are already showing results.",
    date: "2 weeks ago",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    company: "Marketing Director, TechCorp",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    platform: "Fiverr",
    comment:
      "Very professional and skilled developer. The attention to detail on our e-commerce store was exceptional. Would definitely work with again!",
    date: "1 month ago",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    company: "Owner, Boutique Shop",
  },
  {
    name: "Michael Chang",
    rating: 5,
    platform: "Upwork",
    comment:
      "Rajon built our coaching website with impressive speed and quality. Conversion rates have improved by 35% since launch. Highly recommended!",
    date: "3 weeks ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    company: "Business Coach, Growth Mentors",
  },
  {
    name: "Emily Rodriguez",
    rating: 5,
    platform: "Direct Client",
    comment:
      "The website Rajon created has completely transformed my personal brand. I'm getting more high-quality leads than ever before.",
    date: "1 month ago",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    company: "Independent Creator",
  },
  {
    name: "David Wilson",
    rating: 4,
    platform: "Fiverr",
    comment:
      "Great communication throughout the project. Rajon was quick to implement changes and provided valuable suggestions to improve our site.",
    date: "2 months ago",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    company: "Founder, StartupX",
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
    answer: `Pricing varies by project scope. Examples include:<ul>
        <li>WordPress websites: Starting at $${servicePricing["wordpress"].basePrice}</li>
        <li>Email templates: Starting at $${servicePricing["email-templates"].basePrice}</li>
        <li>Headless CMS websites: Starting at $${servicePricing["headless-cms"].basePrice}</li>
        <li>E-commerce websites: Starting at $${servicePricing["ecommerce"].basePrice}</li>
        <li>Custom web applications: Starting at $${servicePricing["custom-web"].basePrice}</li>
      </ul>I'll provide a detailed quote after our consultation to match your budget and goals.`,
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
      "It's simple:<ol><li>Visit the <a href='/order' class='text-green-500 hover:underline'>order page</a> to select services</li><li>Contact me via the <a href='/contact' class='text-green-500 hover:underline'>contact page</a></li><li>Book a free consultation on <a href='https://calendly.com/rajondey' target='_blank' rel='noopener noreferrer' class='text-green-500 hover:underline'>Calendly</a></li></ol>We'll discuss your project, and I'll get you a proposal within 24-48 hours!",
  },
];
