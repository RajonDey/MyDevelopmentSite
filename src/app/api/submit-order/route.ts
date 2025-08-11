import { NextRequest, NextResponse } from "next/server";
import { sendOrderNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Log order for debugging
    console.log("📋 New Order Received:", {
      orderId: orderData.orderId,
      service: orderData.serviceTitle,
      customer: orderData.projectDetails.name,
      email: orderData.projectDetails.email,
      total: orderData.total,
    });

    // Send notification emails
    let emailResult;
    try {
      emailResult = await sendOrderNotificationEmail(orderData);
      console.log("✅ Emails sent successfully:", emailResult);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      // Continue processing even if emails fail
    }

    // Process order locally (save to database, send email, etc.)
    // The order notification will come through the Tally webhook instead

    console.log("✅ Order processed successfully:", {
      orderId: orderData.orderId,
      message: "Order processed and emails sent",
      emailStatus: emailResult ? "success" : "failed",
    });

    return NextResponse.json({
      success: true,
      orderId: orderData.orderId,
      message:
        "Order received successfully. You will receive a Payoneer invoice within 24 hours.",
      emailSent: !!emailResult,
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
