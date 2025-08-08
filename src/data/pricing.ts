// Single source of truth for all service pricing
export const servicePricing = {
  "custom-web": {
    id: 1,
    serviceId: "custom-web",
    title: "Custom Web Application Development",
    basePrice: 999, // Includes first home page
    homePagePrice: 499, // Cost for each additional home page
    innerPagePrice: 249, // Cost for each inner page
    additionalUnitPrice: 0, // Not applicable
    additionalUnitName: "", // Not applicable
  },
  ecommerce: {
    id: 2,
    serviceId: "ecommerce",
    title: "E-Commerce Website Development",
    basePrice: 799, // Includes first home page
    homePagePrice: 449, // Cost for each additional home page
    innerPagePrice: 229, // Cost for each inner page
    additionalUnitPrice: 0, // Not applicable
    additionalUnitName: "", // Not applicable
  },
  "headless-cms": {
    id: 3,
    serviceId: "headless-cms",
    title: "Headless CMS Website Development",
    basePrice: 599, // Includes first home page
    homePagePrice: 399, // Cost for each additional home page
    innerPagePrice: 199, // Cost for each inner page
    additionalUnitPrice: 0, // Not applicable
    additionalUnitName: "", // Not applicable
  },
  wordpress: {
    id: 4,
    serviceId: "wordpress",
    title: "WordPress Website Development",
    basePrice: 199, // Includes first home page
    homePagePrice: 199, // Cost for each additional home page
    innerPagePrice: 99, // Cost for each inner page
    additionalUnitPrice: 0, // Not applicable
    additionalUnitName: "", // Not applicable
  },
  "email-templates": {
    id: 5,
    serviceId: "email-templates",
    title: "Email Template Development",
    basePrice: 149,
    homePagePrice: 0, // Not applicable
    innerPagePrice: 0, // Not applicable
    additionalUnitPrice: 99,
    additionalUnitName: "template",
  },
  maintenance: {
    id: 6,
    serviceId: "maintenance",
    title: "Website Maintenance & Consultation",
    basePrice: 99,
    homePagePrice: 0, // Not applicable
    innerPagePrice: 0, // Not applicable
    additionalUnitPrice: 0, // Priced as monthly service
    additionalUnitName: "",
  },
  automation: {
    id: 7,
    serviceId: "automation",
    title: "Workflow Automation",
    basePrice: 149,
    homePagePrice: 0, // Not applicable
    innerPagePrice: 0, // Not applicable
    additionalUnitPrice: 99,
    additionalUnitName: "workflow",
  },
};

// Function to get pricing for a specific service
export const getServicePricing = (serviceId: string) => {
  return servicePricing[serviceId as keyof typeof servicePricing] || null;
};

// Get service price description for display on cards
export const getServicePriceDescription = (serviceId: string) => {
  const pricing = getServicePricing(serviceId);
  if (!pricing) return "";

  return `Starting at $${pricing.basePrice}`;
};

// Calculate service total based on selections
export const calculateServiceTotal = (
  serviceId: string,
  homePages: number = 0,
  innerPages: number = 0,
  additionalUnits: number = 0,
  options: { [key: string]: any } = {},
  serviceOptions: any = {}
) => {
  const pricing = getServicePricing(serviceId);
  if (!pricing) return 0;

  let total = pricing.basePrice;

  // Add page costs or additional units based on service type
  if (
    ["custom-web", "ecommerce", "headless-cms", "wordpress"].includes(serviceId)
  ) {
    // Base price includes first home page, so subtract 1 from homePages count
    total += Math.max(0, homePages - 1) * pricing.homePagePrice;
    total += innerPages * pricing.innerPagePrice;
  } else if (["email-templates", "automation"].includes(serviceId)) {
    // First unit included in base price, charge for additional units
    total += Math.max(0, additionalUnits - 1) * pricing.additionalUnitPrice;
  }

  // Add option costs if provided
  if (options && serviceOptions && serviceOptions.options) {
    Object.keys(options).forEach((optionKey) => {
      if (!serviceOptions.options[optionKey]) return;

      const option = serviceOptions.options[optionKey];
      const selectedValue = options[optionKey];

      if (option.type === "checkbox" && selectedValue) {
        total += option.price;
      } else if (option.type === "radio" && selectedValue) {
        const selectedOption = option.options.find(
          (opt: { value: string; price: number }) => opt.value === selectedValue
        );
        if (selectedOption) {
          total += selectedOption.price;
        }
      }
    });
  }

  return total;
};

// Get unit name for a service (e.g., "template" for email templates)
export const getServiceUnitName = (serviceId: string) => {
  const pricing = getServicePricing(serviceId);
  return pricing?.additionalUnitName || "";
};
