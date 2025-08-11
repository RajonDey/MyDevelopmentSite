import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Add order ID to data
    orderData.orderId = orderId;

    // TODO: In future, save to database
    // await saveOrderToDatabase(orderData);

    // Send notification email to you (admin)
    await sendAdminNotification(orderData);

    // Send confirmation email to customer
    await sendCustomerConfirmation(orderData);

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order submitted successfully",
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit order" },
      { status: 500 }
    );
  }
}

// Send notification to admin (you)
async function sendAdminNotification(orderData: {
  orderId: string;
  serviceTitle?: string;
  service: string;
  total: number;
  upfrontPayment: number;
  projectDetails: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
  serviceDetails: {
    homePages: number;
    innerPages: number;
    templateCount: number;
    workflowCount: number;
  };
  selectedOptions: Record<string, unknown>;
}) {
  const serviceTitle = orderData.serviceTitle || orderData.service;
  const customer = orderData.projectDetails;

  const emailContent = `
    <h2>🎉 New Order Received!</h2>
    <p><strong>Order ID:</strong> ${orderData.orderId}</p>
    <p><strong>Service:</strong> ${serviceTitle}</p>
    <p><strong>Total Amount:</strong> $${orderData.total}</p>
    <p><strong>Upfront Payment:</strong> $${orderData.upfrontPayment}</p>
    
    <h3>Customer Information:</h3>
    <ul>
      <li><strong>Name:</strong> ${customer.name}</li>
      <li><strong>Email:</strong> ${customer.email}</li>
      <li><strong>Phone:</strong> ${customer.phone}</li>
    </ul>
    
    <h3>Project Details:</h3>
    ${
      orderData.serviceDetails.homePages
        ? `<p><strong>Home Pages:</strong> ${orderData.serviceDetails.homePages}</p>`
        : ""
    }
    ${
      orderData.serviceDetails.innerPages
        ? `<p><strong>Inner Pages:</strong> ${orderData.serviceDetails.innerPages}</p>`
        : ""
    }
    ${
      orderData.serviceDetails.templateCount > 1
        ? `<p><strong>Templates:</strong> ${orderData.serviceDetails.templateCount}</p>`
        : ""
    }
    ${
      orderData.serviceDetails.workflowCount > 1
        ? `<p><strong>Workflows:</strong> ${orderData.serviceDetails.workflowCount}</p>`
        : ""
    }
    
    <h3>Selected Options:</h3>
    <pre>${JSON.stringify(orderData.selectedOptions, null, 2)}</pre>
    
    ${
      customer.notes ? `<h3>Additional Notes:</h3><p>${customer.notes}</p>` : ""
    }
    
    <hr>
    <p><strong>Next Steps:</strong></p>
    <ol>
      <li>Create Payoneer invoice for $${
        orderData.upfrontPayment
      } (50% upfront)</li>
      <li>Send invoice to: ${customer.email}</li>
      <li>Start project after payment confirmation</li>
    </ol>
  `;

  await resend.emails.send({
    from: "orders@development.rajondey.com",
    to: "rajondey@gmail.com", // Your email
    subject: `New Order: ${serviceTitle} - ${customer.name}`,
    html: emailContent,
  });
}

// Send confirmation to customer
async function sendCustomerConfirmation(orderData: {
  orderId: string;
  serviceTitle?: string;
  service: string;
  total: number;
  upfrontPayment: number;
  projectDetails: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
}) {
  const serviceTitle = orderData.serviceTitle || orderData.service;
  const customer = orderData.projectDetails;

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #16a34a;">Thank you for your order, ${customer.name}!</h2>
      
      <p>Your project request has been received and is being reviewed by our team.</p>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order Summary</h3>
        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p><strong>Service:</strong> ${serviceTitle}</p>
        <p><strong>Total Cost:</strong> $${orderData.total}</p>
        <p><strong>Upfront Payment:</strong> $${orderData.upfrontPayment} (50%)</p>
        <p><strong>Estimated Delivery:</strong> 5-10 business days</p>
      </div>
      
      <h3>What happens next?</h3>
      <ol>
        <li><strong>Review (24 hours):</strong> We'll review your requirements and may contact you for clarification</li>
        <li><strong>Invoice:</strong> You'll receive a secure payment invoice via Payoneer</li>
        <li><strong>Payment:</strong> Pay securely using your preferred method (card, bank transfer, etc.)</li>
        <li><strong>Development:</strong> We start working on your project immediately after payment</li>
        <li><strong>Delivery:</strong> Regular updates and final delivery as agreed</li>
      </ol>
      
      <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Questions?</strong> Simply reply to this email or contact us at:</p>
        <p style="margin: 5px 0 0 0;">📧 rajondey@gmail.com | 📱 WhatsApp: +880-123-456-789</p>
      </div>
      
      <p>Thank you for choosing our development services!</p>
      <p><strong>Best regards,</strong><br>
      Rajon Dey<br>
      Full-Stack Developer</p>
    </div>
  `;

  await resend.emails.send({
    from: "orders@development.rajondey.com",
    to: customer.email,
    subject: `Order Confirmation - ${orderData.orderId}`,
    html: emailContent,
  });
}
