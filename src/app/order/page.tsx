"use client";

import { useState } from "react";
import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/badge";
import {
  Code,
  ShoppingCart,
  Zap,
  Workflow,
  Mail,
  Database,
  Check,
  Upload,
  DollarSign,
  Clock,
  Shield,
  FileText,
} from "lucide-react";

export default function OrderPage() {
  const [selectedService, setSelectedService] = useState("custom-web");
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: any;
  }>({});
  const [projectDetails, setProjectDetails] = useState({
    homePages: 1,
    innerPages: 0,
    name: "",
    email: "",
    phone: "",
    skype: "",
    notes: "",
    couponCode: "",
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
      id: "headless-cms",
      name: "Headless CMS Solutions",
      icon: Database,
      description: "Contentful, Sanity, WordPress",
    },
    {
      id: "ecommerce",
      name: "E-commerce Platforms",
      icon: ShoppingCart,
      description: "Shopify, Custom Next.js Stores",
    },
    {
      id: "performance",
      name: "Performance Optimization",
      icon: Zap,
      description: "30%+ Page Load Reduction",
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
      basePrice: 499,
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
      basePrice: 699,
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
      basePrice: 799,
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
    performance: {
      basePrice: 299,
      options: {
        audit: {
          label: "Performance Audit",
          type: "checkbox",
          price: 0,
          description: "Comprehensive performance analysis",
        },
        optimization: {
          label: "Code Optimization",
          type: "checkbox",
          price: 0,
          description: "Bundle size and loading optimization",
        },
        caching: {
          label: "Advanced Caching",
          type: "checkbox",
          price: 99,
          description: "Redis, CDN implementation",
        },
      },
    },
    automation: {
      basePrice: 299,
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
      basePrice: 199,
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

  const handleOptionChange = (optionKey: string, value: any) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
  };

  const calculateTotal = () => {
    const service =
      serviceOptions[selectedService as keyof typeof serviceOptions];
    let total = service.basePrice;

    // Add option costs
    Object.keys(service.options).forEach((optionKey) => {
      const option = service.options[optionKey as keyof typeof service.options];
      const selectedValue = selectedOptions[optionKey];

      if (option.type === "checkbox" && selectedValue) {
        total += option.price;
      } else if (option.type === "radio" && selectedValue) {
        const selectedOption = option.options.find(
          (opt: any) => opt.value === selectedValue
        );
        if (selectedOption) {
          total += selectedOption.price;
        }
      }
    });

    // Add page costs
    total += projectDetails.homePages * 499;
    total += projectDetails.innerPages * 249;

    return total;
  };

  const total = calculateTotal();
  const upfrontPayment = total * 0.5;

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
                  onClick={() => setSelectedService(service.id)}
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
                            {option.options.map((opt: any) => (
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
                            ))}
                          </div>
                        )}

                        {option.type === "checkbox" && (
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedOptions[key] || false}
                              onChange={(e) =>
                                handleOptionChange(key, e.target.checked)
                              }
                              className="text-green-600"
                            />
                            <span className="flex-1">{option.description}</span>
                            <span className="text-sm text-gray-500">
                              {option.price === 0
                                ? "Free"
                                : `+$${option.price}`}
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

                {/* Page Count */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Total Pages
                  </label>
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
                        $499 each
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
                        $249 each
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={projectDetails.name}
                    onChange={(e) =>
                      setProjectDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={projectDetails.email}
                    onChange={(e) =>
                      setProjectDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={projectDetails.phone}
                    onChange={(e) =>
                      setProjectDetails((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Skype (Optional)"
                    value={projectDetails.skype}
                    onChange={(e) =>
                      setProjectDetails((prev) => ({
                        ...prev,
                        skype: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded"
                  />
                </div>

                {/* Project Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    placeholder="Describe your project requirements..."
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
                    Upload Files
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Drop files here or click to upload
                    </p>
                    <input type="file" className="hidden" multiple />
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={projectDetails.couponCode}
                      onChange={(e) =>
                        setProjectDetails((prev) => ({
                          ...prev,
                          couponCode: e.target.value,
                        }))
                      }
                      className="flex-1 p-3 border rounded"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
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
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Cost:</span>
                    <span className="text-lg font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">50% Upfront:</span>
                    <span className="text-lg font-bold text-green-600">
                      ${upfrontPayment.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium">
                  Review Order & Pay
                </Button>

                <div className="text-center mt-3">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>100% Money Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
