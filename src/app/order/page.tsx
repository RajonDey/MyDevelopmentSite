"use client";

import { useState } from "react";
import { SEO } from "@/components/seo";
import { Button } from "@/components/common/ui/Button";
import { servicePricing, getServicePricing } from "@/data/pricing";
import {
  Code,
  ShoppingCart,
  Globe,
  Workflow,
  Mail,
  Database,
  Upload,
  Shield,
} from "lucide-react";

export default function OrderPage() {
  const [selectedService, setSelectedService] = useState("custom-web");
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string | boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderSummary, setOrderSummary] = useState({
    orderId: "",
    total: 0,
    upfrontPayment: 0,
    serviceTitle: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [projectDetails, setProjectDetails] = useState({
    // Common fields
    name: "",
    email: "",
    phone: "",
    notes: "",
    couponCode: "",

    // Service-specific fields
    homePages: 1,
    innerPages: 0,
    templateCount: 1,
    workflowCount: 1,
  });

  // Service categories
  const serviceCategories = [
    {
      id: "custom-web",
      name: "Custom Web Development",
      icon: Code,
      description: "React, Next.js, TypeScript",
    },
    {
      id: "ecommerce",
      name: "E-commerce Platforms",
      icon: ShoppingCart,
      description: "Shopify, Custom Next.js Stores",
    },
    {
      id: "headless-cms",
      name: "Headless CMS Solutions",
      icon: Database,
      description: "Contentful, Sanity, WordPress",
    },
    {
      id: "wordpress",
      name: "WordPress Development",
      icon: Globe,
      description: "Custom themes & plugins",
    },
    {
      id: "automation",
      name: "Workflow Automation",
      icon: Workflow,
      description: "n8n, GHL Integration",
    },
    {
      id: "email-templates",
      name: "Email Template Development",
      icon: Mail,
      description: "Responsive Email Templates",
    },
  ];

  // Service options with pricing
  const serviceOptions = {
    "custom-web": {
      basePrice: servicePricing["custom-web"].basePrice, // Use centralized pricing
      options: {
        framework: {
          label: "Framework Selection",
          type: "radio",
          default: "nextjs",
          options: [
            { value: "nextjs", label: "Next.js (Recommended)", price: 0 },
            { value: "react", label: "React", price: 0 },
            { value: "vue", label: "Vue.js", price: 50 },
            { value: "angular", label: "Angular", price: 100 },
          ],
        },
        typescript: {
          label: "TypeScript Integration",
          type: "checkbox",
          price: 99,
          description: "Enhanced type safety and developer experience",
        },
        responsive: {
          label: "Responsive Design",
          type: "checkbox",
          price: 0,
          description: "Mobile-first responsive design",
        },
        seo: {
          label: "SEO Optimization",
          type: "checkbox",
          price: 79,
          description: "Search engine optimization",
        },
        performance: {
          label: "Performance Optimization",
          type: "checkbox",
          price: 129,
          description: "30%+ page load speed improvement",
        },
        animations: {
          label: "Custom Animations",
          type: "checkbox",
          price: 149,
          description: "Framer Motion animations",
        },
      },
    },
    "headless-cms": {
      basePrice: servicePricing["headless-cms"].basePrice, // Use centralized pricing
      options: {
        "cms-platform": {
          label: "CMS Platform",
          type: "radio",
          default: "contentful",
          options: [
            { value: "contentful", label: "Contentful", price: 0 },
            { value: "sanity", label: "Sanity", price: 0 },
            { value: "wordpress", label: "WordPress Headless", price: 50 },
            { value: "strapi", label: "Strapi", price: 75 },
          ],
        },
        "content-migration": {
          label: "Content Migration",
          type: "checkbox",
          price: 199,
          description: "Migrate existing content to new CMS",
        },
        "api-integration": {
          label: "API Integration",
          type: "checkbox",
          price: 149,
          description: "Custom API endpoints",
        },
      },
    },
    ecommerce: {
      basePrice: servicePricing["ecommerce"].basePrice, // Use centralized pricing
      options: {
        platform: {
          label: "E-commerce Platform",
          type: "radio",
          default: "shopify",
          options: [
            { value: "shopify", label: "Shopify", price: 0 },
            {
              value: "custom-nextjs",
              label: "Custom Next.js Store",
              price: 200,
            },
            { value: "woocommerce", label: "WooCommerce", price: 100 },
          ],
        },
        "payment-gateway": {
          label: "Payment Gateway",
          type: "checkbox",
          price: 99,
          description: "Stripe, PayPal integration",
        },
        inventory: {
          label: "Inventory Management",
          type: "checkbox",
          price: 149,
          description: "Advanced inventory tracking",
        },
      },
    },
    wordpress: {
      basePrice: servicePricing["wordpress"].basePrice, // Use centralized pricing
      options: {
        "theme-type": {
          label: "Theme Type",
          type: "radio",
          default: "custom",
          options: [
            { value: "custom", label: "Custom Theme", price: 0 },
            { value: "premium", label: "Premium Theme", price: -50 },
          ],
        },
        "seo-optimization": {
          label: "SEO Optimization",
          type: "checkbox",
          price: 99,
          description: "On-page SEO optimization for WordPress",
        },
        woocommerce: {
          label: "WooCommerce Integration",
          type: "checkbox",
          price: 149,
          description: "Add e-commerce functionality",
        },
      },
    },
    automation: {
      basePrice: servicePricing["automation"].basePrice, // Use centralized pricing
      options: {
        platform: {
          label: "Automation Platform",
          type: "radio",
          default: "n8n",
          options: [
            { value: "n8n", label: "n8n", price: 0 },
            { value: "zapier", label: "Zapier", price: 50 },
            { value: "make", label: "Make.com", price: 75 },
          ],
        },
        workflows: {
          label: "Custom Workflows",
          type: "checkbox",
          price: 199,
          description: "5 custom automation workflows",
        },
        integrations: {
          label: "Third-party Integrations",
          type: "checkbox",
          price: 149,
          description: "CRM, email, payment integrations",
        },
      },
    },
    "email-templates": {
      basePrice: servicePricing["email-templates"].basePrice, // Use centralized pricing
      options: {
        "template-count": {
          label: "Number of Templates",
          type: "radio",
          default: "3",
          options: [
            { value: "1", label: "1 Template", price: 0 },
            { value: "3", label: "3 Templates", price: 50 },
            { value: "5", label: "5 Templates", price: 100 },
          ],
        },
        responsive: {
          label: "Responsive Design",
          type: "checkbox",
          price: 0,
          description: "Mobile-friendly email templates",
        },
        branding: {
          label: "Custom Branding",
          type: "checkbox",
          price: 49,
          description: "Your brand colors and fonts",
        },
      },
    },
  };

  // Define types for option types
  type RadioOption = {
    label: string;
    type: "radio";
    default: string;
    options: Array<{ value: string; label: string; price: number }>;
  };

  type CheckboxOption = {
    label: string;
    type: "checkbox";
    price: number;
    description: string;
  };

  const handleOptionChange = (optionKey: string, value: string | boolean) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = () => {
    if (projectDetails.couponCode.trim() === "") return;

    // Simple coupon logic - you can enhance this
    const coupon = projectDetails.couponCode.toLowerCase();
    if (coupon === "welcome10") {
      setCouponDiscount(total * 0.1); // 10% discount
      setCouponApplied(true);
    } else if (coupon === "launch20") {
      setCouponDiscount(total * 0.2); // 20% discount
      setCouponApplied(true);
    } else {
      setCouponDiscount(0);
      setCouponApplied(false);
      alert("Invalid coupon code");
    }
  };

  const getFinalTotal = () => {
    return total - couponDiscount;
  };

  const getFinalUpfront = () => {
    return (total - couponDiscount) * 0.5;
  };

  // Service-specific Project Detail Components
  // Service-specific Project Detail Components that use pricing data
  const PageBasedServiceDetails = ({ serviceId }: { serviceId: string }) => {
    const pricing = getServicePricing(serviceId);

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Total Pages</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Home Pages
            </label>
            <input
              type="number"
              min="1"
              value={projectDetails.homePages}
              onChange={(e) =>
                setProjectDetails((prev) => ({
                  ...prev,
                  homePages: parseInt(e.target.value) || 1,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <div className="text-xs text-gray-500 mt-1">
              Base ${pricing?.basePrice} includes 1st page, +$
              {pricing?.homePagePrice} for each additional
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Inner Pages
            </label>
            <input
              type="number"
              min="0"
              value={projectDetails.innerPages}
              onChange={(e) =>
                setProjectDetails((prev) => ({
                  ...prev,
                  innerPages: parseInt(e.target.value) || 0,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <div className="text-xs text-gray-500 mt-1">
              ${pricing?.innerPagePrice} each
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UnitBasedServiceDetails = ({
    serviceId,
    unitName,
    countField,
  }: {
    serviceId: string;
    unitName: string;
    countField: "templateCount" | "workflowCount";
  }) => {
    const pricing = getServicePricing(serviceId);

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">{unitName}s</label>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Number of {unitName}s
            </label>
            <input
              type="number"
              min="1"
              value={projectDetails[countField]}
              onChange={(e) =>
                setProjectDetails((prev) => ({
                  ...prev,
                  [countField]: parseInt(e.target.value) || 1,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <div className="text-xs text-gray-500 mt-1">
              ${pricing?.basePrice} for first {unitName}, $
              {pricing?.additionalUnitPrice} each additional
            </div>
          </div>
        </div>
      </div>
    );
  };

  const calculateTotal = () => {
    // Get base price from centralized pricing
    const basePrice =
      servicePricing[selectedService as keyof typeof servicePricing]
        ?.basePrice || 0;

    let total = basePrice;

    // Add page costs for page-based services
    if (
      ["custom-web", "headless-cms", "ecommerce", "wordpress"].includes(
        selectedService
      )
    ) {
      const homePagePrice =
        servicePricing[selectedService as keyof typeof servicePricing]
          ?.homePagePrice || 0;
      const innerPagePrice =
        servicePricing[selectedService as keyof typeof servicePricing]
          ?.innerPagePrice || 0;

      // Base price includes first home page, so subtract 1 from homePages count
      total += Math.max(0, projectDetails.homePages - 1) * homePagePrice;
      total += projectDetails.innerPages * innerPagePrice;
    }

    // Add unit costs for unit-based services
    if (selectedService === "email-templates") {
      const additionalUnitPrice =
        servicePricing[selectedService as keyof typeof servicePricing]
          ?.additionalUnitPrice || 0;
      // First unit included in base price, charge for additional units
      total +=
        Math.max(0, projectDetails.templateCount - 1) * additionalUnitPrice;
    } else if (selectedService === "automation") {
      const additionalUnitPrice =
        servicePricing[selectedService as keyof typeof servicePricing]
          ?.additionalUnitPrice || 0;
      // First unit included in base price, charge for additional units
      total +=
        Math.max(0, projectDetails.workflowCount - 1) * additionalUnitPrice;
    }

    // Add option costs
    const currentServiceOptions =
      serviceOptions[selectedService as keyof typeof serviceOptions];
    if (currentServiceOptions?.options) {
      Object.entries(selectedOptions).forEach(([key, value]) => {
        const option = (
          currentServiceOptions.options as Record<
            string,
            RadioOption | CheckboxOption
          >
        )[key];
        if (option && value) {
          if (option.type === "checkbox" && value === true) {
            total += option.price;
          } else if (option.type === "radio" && typeof value === "string") {
            const selectedOption = option.options?.find(
              (opt: { value: string; price: number }) => opt.value === value
            );
            if (selectedOption) {
              total += selectedOption.price;
            }
          }
        }
      });
    }

    return total;
  };

  const total = calculateTotal();
  const upfrontPayment = total * 0.5;

  // Form validation
  const isFormValid = () => {
    return (
      projectDetails.name.trim() !== "" &&
      projectDetails.email.trim() !== "" &&
      projectDetails.phone.trim() !== "" &&
      projectDetails.notes.trim() !== ""
    );
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!isFormValid()) {
      alert(
        "Please fill in all required fields (Name, Email, Phone, Project Details)"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Format selected options for display
      const formatSelectedOptions = () => {
        let optionsText = "";
        Object.entries(selectedOptions).forEach(([key, value]) => {
          if (value) {
            if (typeof value === "string") {
              optionsText += `${key}: ${value}\n`;
            } else if (value === true) {
              optionsText += `✓ ${key}\n`;
            }
          }
        });
        return optionsText;
      };

      // Format service details based on service type
      const formatServiceDetails = () => {
        let details = "";
        if (
          ["custom-web", "headless-cms", "ecommerce", "wordpress"].includes(
            selectedService
          )
        ) {
          details = `Pages: ${projectDetails.homePages} home page(s), ${projectDetails.innerPages} inner page(s)`;
        } else if (selectedService === "email-templates") {
          details = `Templates: ${projectDetails.templateCount} template(s)`;
        } else if (selectedService === "automation") {
          details = `Workflows: ${projectDetails.workflowCount} workflow(s)`;
        }
        return details;
      };

      // Create formatted message for Tally
      const orderMessage = `
🛒 NEW ORDER SUBMISSION

📋 SERVICE DETAILS:
Service: ${serviceCategories.find((s) => s.id === selectedService)?.name}
${formatServiceDetails()}

⚙️ SELECTED OPTIONS:
${formatSelectedOptions()}

👤 CLIENT INFORMATION:
Name: ${projectDetails.name}
Email: ${projectDetails.email}
Phone: ${projectDetails.phone}

📝 PROJECT DETAILS:
${projectDetails.notes || "No additional details provided"}

💰 PRICING:
Total Project Cost: $${total.toFixed(2)}
50% Upfront Payment: $${upfrontPayment.toFixed(2)}

🕐 ORDER INFO:
Order ID: ORD-${Date.now()}
Timestamp: ${new Date().toLocaleString()}
      `.trim();

      // Submit to Tally form
      const tallyFormData = new FormData();
      tallyFormData.append("name", projectDetails.name);
      tallyFormData.append("email", projectDetails.email);
      tallyFormData.append("phone", projectDetails.phone);
      tallyFormData.append("message", orderMessage);

      // Create order object
      const orderData = {
        // Order details
        service: selectedService,
        serviceTitle: serviceCategories.find((s) => s.id === selectedService)
          ?.name,
        selectedOptions,
        projectDetails,

        // Pricing
        total,
        upfrontPayment,

        // Additional metadata
        timestamp: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`,

        // Service-specific details
        serviceDetails: {
          homePages: projectDetails.homePages,
          innerPages: projectDetails.innerPages,
          templateCount: projectDetails.templateCount,
          workflowCount: projectDetails.workflowCount,
        },

        // Formatted message for easy reading
        formattedMessage: orderMessage,
      };

      // Submit to our API
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Set order summary for modal
        setOrderSummary({
          orderId: result.orderId,
          total: getFinalTotal(),
          upfrontPayment: getFinalUpfront(),
          serviceTitle:
            serviceCategories.find((s) => s.id === selectedService)?.name || "",
        });

        // Show success modal
        setShowSuccessModal(true);

        // Reset form
        setProjectDetails({
          name: "",
          email: "",
          phone: "",
          notes: "",
          couponCode: "",
          homePages: 1,
          innerPages: 0,
          templateCount: 1,
          workflowCount: 1,
        });
        setSelectedOptions({});
        setSelectedFiles([]);
        setCouponApplied(false);
        setCouponDiscount(0);
      } else {
        throw new Error(result.error || "Failed to submit order");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert(
        "Failed to submit order. Please try again or contact me directly at contact@rajondey.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Order Web Development Services - Rajon Dey"
        description="Order custom web development services with interactive pricing. Choose your features and get instant quotes for React, Next.js, e-commerce, and more."
        url="/order"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Ready to Build Your Project? Order Now!
            </h1>
            <p className="text-xl text-gray-600">
              Choose your services and get an instant quote with fast turnaround
              time.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Service Categories - Top Row */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Choose Your Service</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {serviceCategories.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    // Reset service-specific fields based on the selected service
                    if (
                      [
                        "custom-web",
                        "headless-cms",
                        "ecommerce",
                        "wordpress",
                      ].includes(service.id)
                    ) {
                      setProjectDetails((prev) => ({
                        ...prev,
                        homePages: 1,
                        innerPages: 0,
                      }));
                    } else if (service.id === "email-templates") {
                      setProjectDetails((prev) => ({
                        ...prev,
                        templateCount: 1,
                      }));
                    } else if (service.id === "automation") {
                      setProjectDetails((prev) => ({
                        ...prev,
                        workflowCount: 1,
                      }));
                    }
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedService === service.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <service.icon className="w-6 h-6 mb-2 mx-auto" />
                  <div className="text-sm font-medium">{service.name}</div>
                  <div className="text-xs text-gray-500">
                    {service.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Options */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">
                Customize Your Service
              </h2>

              {selectedService &&
                serviceOptions[
                  selectedService as keyof typeof serviceOptions
                ] && (
                  <div className="space-y-6">
                    {Object.entries(
                      serviceOptions[
                        selectedService as keyof typeof serviceOptions
                      ].options
                    ).map(([key, option]) => (
                      <div key={key} className="border-b border-gray-100 pb-4">
                        <h3 className="font-medium mb-3">{option.label}</h3>

                        {option.type === "radio" && (
                          <div className="space-y-2">
                            {(option as RadioOption).options.map(
                              (opt: {
                                value: string;
                                label: string;
                                price: number;
                              }) => (
                                <label
                                  key={opt.value}
                                  className="flex items-center space-x-3 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={key}
                                    value={opt.value}
                                    checked={selectedOptions[key] === opt.value}
                                    onChange={(e) =>
                                      handleOptionChange(key, e.target.value)
                                    }
                                    className="text-green-600"
                                  />
                                  <span className="flex-1">{opt.label}</span>
                                  <span className="text-sm text-gray-500">
                                    {opt.price === 0
                                      ? "Included"
                                      : `+$${opt.price}`}
                                  </span>
                                </label>
                              )
                            )}
                          </div>
                        )}

                        {option.type === "checkbox" && (
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(selectedOptions[key])}
                              onChange={(e) =>
                                handleOptionChange(key, e.target.checked)
                              }
                              className="text-green-600"
                            />
                            <span className="flex-1">
                              {(option as CheckboxOption).description}
                            </span>
                            <span className="text-sm text-gray-500">
                              {(option as CheckboxOption).price === 0
                                ? "Free"
                                : `+$${(option as CheckboxOption).price}`}
                            </span>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Project Details</h2>

                {/* Project Details - Conditionally Rendered */}
                {[
                  "custom-web",
                  "headless-cms",
                  "ecommerce",
                  "wordpress",
                ].includes(selectedService) && (
                  <PageBasedServiceDetails serviceId={selectedService} />
                )}
                {selectedService === "email-templates" && (
                  <UnitBasedServiceDetails
                    serviceId={selectedService}
                    unitName="Template"
                    countField="templateCount"
                  />
                )}
                {selectedService === "automation" && (
                  <UnitBasedServiceDetails
                    serviceId={selectedService}
                    unitName="Workflow"
                    countField="workflowCount"
                  />
                )}

                {/* Contact Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Contact Information
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Fields marked with <span className="text-red-500">*</span>{" "}
                    are required
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={projectDetails.name}
                      onChange={(e) =>
                        setProjectDetails((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full p-3 border rounded"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={projectDetails.email}
                      onChange={(e) =>
                        setProjectDetails((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full p-3 border rounded"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={projectDetails.phone}
                      onChange={(e) =>
                        setProjectDetails((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full p-3 border rounded"
                      required
                    />
                  </div>
                </div>

                {/* Project Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Project Details / Specific Notes{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe your project requirements, goals, and any specific features you need..."
                    value={projectDetails.notes}
                    onChange={(e) =>
                      setProjectDetails((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full p-3 border rounded"
                  />
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Upload Files (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Drop files here or click to upload
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Choose Files
                    </label>
                  </div>

                  {/* Display selected files */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Selected Files:
                      </p>
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <span className="text-sm text-gray-600 truncate">
                            {file.name}
                          </span>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (Optional)"
                      value={projectDetails.couponCode}
                      onChange={(e) =>
                        setProjectDetails((prev) => ({
                          ...prev,
                          couponCode: e.target.value,
                        }))
                      }
                      className="flex-1 p-3 border rounded"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={!projectDetails.couponCode.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                  {couponApplied && (
                    <div className="mt-2 text-sm text-green-600">
                      ✓ Coupon applied! Discount: ${couponDiscount.toFixed(2)}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Try: welcome10 (10% off) or launch20 (20% off)
                  </p>
                </div>

                {/* Cost Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Estimated Delivery:
                    </span>
                    <span className="text-sm font-medium">
                      5-10 Business Days
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Original Total:
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Cost:</span>
                    <span className="text-lg font-bold">
                      ${getFinalTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">50% Upfront:</span>
                    <span className="text-lg font-bold text-green-600">
                      ${getFinalUpfront().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleSubmitOrder}
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 text-lg font-medium"
                >
                  {isSubmitting ? "Submitting..." : "Submit Order Request"}
                </Button>

                <div className="text-center mt-3">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Secure Order Processing</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    You&apos;ll receive a payment invoice within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Order Submitted Successfully! 🎉
            </h3>

            <div className="text-left bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Order ID:</span>
                  <p className="text-gray-900 font-mono">
                    {orderSummary.orderId}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Service:</span>
                  <p className="text-gray-900">{orderSummary.serviceTitle}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Total:</span>
                  <p className="text-gray-900 font-bold">
                    ${orderSummary.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Upfront (50%):
                  </span>
                  <p className="text-gray-900 font-bold text-green-600">
                    ${orderSummary.upfrontPayment.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              You will receive a Payoneer invoice within 24 hours. Check your
              email for confirmation.
            </p>

            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
