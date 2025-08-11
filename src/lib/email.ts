import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface OrderData {
  orderId: string;
  serviceTitle: string;
  selectedOptions: { [key: string]: string | boolean };
  projectDetails: {
    name: string;
    email: string;
    phone: string;
    notes: string;
    homePages: number;
    innerPages: number;
    templateCount: number;
    workflowCount: number;
  };
  total: number;
  upfrontPayment: number;
  timestamp: string;
  service: string;
  serviceDetails: {
    homePages: number;
    innerPages: number;
    templateCount: number;
    workflowCount: number;
  };
}

export async function sendOrderNotificationEmail(orderData: OrderData) {
  try {
    // Format selected options for display
    const formatSelectedOptions = () => {
      let optionsText = "";
      Object.entries(orderData.selectedOptions).forEach(([key, value]) => {
        if (value) {
          if (typeof value === "string") {
            optionsText += `${key}: ${value}\n`;
          } else if (value === true) {
            optionsText += `✓ ${key}\n`;
          }
        }
      });
      return optionsText || "No additional options selected";
    };

    // Format service details based on service type
    const formatServiceDetails = () => {
      let details = "";
      if (
        ["custom-web", "headless-cms", "ecommerce", "wordpress"].includes(
          orderData.service
        )
      ) {
        details = `Pages: ${orderData.serviceDetails.homePages} home page(s), ${orderData.serviceDetails.innerPages} inner page(s)`;
      } else if (orderData.service === "email-templates") {
        details = `Templates: ${orderData.serviceDetails.templateCount} template(s)`;
      } else if (orderData.service === "automation") {
        details = `Workflows: ${orderData.serviceDetails.workflowCount} workflow(s)`;
      }
      return details;
    };

    // Format date
    const orderDate = new Date(orderData.timestamp);
    const formattedDate = orderDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Create the formatted email content
    const emailContent = `
🛒 NEW ORDER SUBMISSION

📋 SERVICE: ${orderData.serviceTitle}
${formatServiceDetails()}

💰 TOTAL: $${orderData.total.toFixed(2)}
💵 UPFRONT (50%): $${orderData.upfrontPayment.toFixed(2)}

👤 CLIENT:
Name: ${orderData.projectDetails.name}
Email: ${orderData.projectDetails.email}
Phone: ${orderData.projectDetails.phone}

📝 NOTES: ${orderData.projectDetails.notes || "No additional details provided"}

🆔 ORDER ID: ${orderData.orderId}
📅 DATE: ${formattedDate}

⚙️ SELECTED OPTIONS:
${formatSelectedOptions()}

---
This order was submitted through your website. Please create a Payoneer invoice and share it with the client within 24 hours.
    `.trim();

    // Send email to you (business owner)
    const businessEmail = process.env.BUSINESS_EMAIL || "contact@rajondey.com";
    const fromEmail = process.env.FROM_EMAIL || businessEmail; // Use your real email as default
    const businessEmailResult = await resend.emails.send({
      from: `Rajon Dey Development <${fromEmail}>`,
      to: [businessEmail],
      subject: `🛒 New Order: ${orderData.serviceTitle} - ${orderData.orderId}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, "<br>"),
    });

    // Send confirmation email to client
    const clientEmailContent = `
Thank you for your order!

Your order has been received and is being processed.

📋 SERVICE: ${orderData.serviceTitle}
💰 TOTAL: $${orderData.total.toFixed(2)}
💵 UPFRONT PAYMENT (50%): $${orderData.upfrontPayment.toFixed(2)}
🆔 ORDER ID: ${orderData.orderId}

I will create your Payoneer invoice and share it with you within 24 hours.

If you have any questions, please don't hesitate to contact me at contact@rajondey.com

Best regards,
Rajon Dey
    `.trim();

    const clientEmailResult = await resend.emails.send({
      from: `Rajon Dey Development <${fromEmail}>`,
      to: [orderData.projectDetails.email],
      subject: `Order Confirmation - ${orderData.orderId}`,
      text: clientEmailContent,
      html: clientEmailContent.replace(/\n/g, "<br>"),
    });

    return {
      success: true,
      businessEmailId: businessEmailResult.data?.id,
      clientEmailId: clientEmailResult.data?.id,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send order notification emails");
  }
}
