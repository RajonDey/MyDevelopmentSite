import { Service } from "../../types/services";

export const services: Service[] = [
  {
    id: "custom-web",
    title: "Custom Web Application Development",
    description:
      "Transform your ideas into reality with custom web applications designed for scalability, efficiency, and user engagement.",
    price: 499,
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
    id: "ecommerce",
    title: "E-Commerce Website Development",
    description:
      "Build high-performing online stores with seamless user experiences, secure payment gateways, and robust inventory management.",
    price: 799,
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
    id: "headless-cms",
    title: "Headless CMS Website Development",
    description:
      "Develop modern, content-rich websites using headless CMS platforms for flexibility, scalability, and faster performance.",
    price: 699,
    iconName: "Layers", // Represents layered/headless architecture
    image: "/portfolio-images/clicks.jpg?height=200&width=300",
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
    id: "wordpress",
    title: "WordPress Website Development",
    description:
      "Design and develop custom WordPress websites with tailored themes, plugins, and functionalities to meet your business goals.",
    price: 499,
    iconName: "Globe",
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
    id: "email-templates",
    title: "Email Template Development",
    description:
      "Design and code responsive email templates that work across all devices and email clients, ensuring your campaigns look professional and engaging.",
    price: 199,
    iconName: "Mail", // Represents email
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
    id: "maintenance",
    title: "Website Maintenance & Consultation",
    description:
      "Ensure your website remains secure, up-to-date, and optimized with ongoing maintenance and expert consultation services.",
    price: 299,
    iconName: "Wrench", // Represents maintenance/repair
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
