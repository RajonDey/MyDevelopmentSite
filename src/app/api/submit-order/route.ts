import { NextRequest, NextResponse } from "next/server";

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

    // Process order locally (save to database, send email, etc.)
    // The order notification will come through the Tally webhook instead

    console.log("✅ Order processed successfully:", {
      orderId: orderData.orderId,
      message: "Order will be forwarded via Tally form for notifications",
    });

    return NextResponse.json({
      success: true,
      orderId: orderData.orderId,
      message:
        "Order received successfully. You will receive a Payoneer invoice within 24 hours.",
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
