import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the webhook payload
    const webhookPayload = await request.json();

    // Optional: Verify webhook signature if you configure a signing secret
    // const receivedSignature = request.headers.get('tally-signature');
    // const signingSecret = process.env.TALLY_WEBHOOK_SECRET;
    // if (signingSecret && receivedSignature) {
    //   const calculatedSignature = createHmac('sha256', signingSecret)
    //     .update(JSON.stringify(webhookPayload))
    //     .digest('base64');
    //
    //   if (receivedSignature !== calculatedSignature) {
    //     return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    //   }
    // }

    // Log the webhook data
    console.log("🎯 Tally Webhook Received:", {
      eventType: webhookPayload.eventType,
      formId: webhookPayload.data?.formId,
      formName: webhookPayload.data?.formName,
      responseId: webhookPayload.data?.responseId,
      timestamp: webhookPayload.createdAt,
    });

    // Process form submission (this will be triggered when someone submits your Tally form)
    if (webhookPayload.eventType === "FORM_RESPONSE") {
      const formData = webhookPayload.data;

      // Extract field values from the webhook
      const fields = formData.fields || [];
      const fieldData: Record<string, unknown> = {};

      // Parse fields into a more usable format
      fields.forEach((field: { label: string; value: unknown }) => {
        fieldData[field.label] = field.value;
      });

      console.log("📋 Form Submission Received via Webhook:", {
        formName: formData.formName,
        responseId: formData.responseId,
        submittedFields: Object.keys(fieldData),
        data: fieldData,
      });

      // Here you can process the form submission as needed
      // For example, send email notifications, save to database, etc.

      // Log specific fields if they match your form structure
      if (fieldData.Name && fieldData.Email) {
        console.log("✅ Project inquiry received:", {
          name: fieldData.Name,
          email: fieldData.Email,
          project: fieldData["What can we help you with?"] || fieldData.Help,
          budget: fieldData.Budget,
          description:
            fieldData["Tell us more about your project"] ||
            fieldData.Message ||
            fieldData.Description,
          timeline: fieldData.Timeline,
        });
      }
    }

    // Always return a successful status code within 10 seconds
    return NextResponse.json(
      {
        success: true,
        message: "Webhook processed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Webhook processing error:", error);

    // Return error but still with 200 status to prevent retries for invalid data
    return NextResponse.json(
      {
        error: "Failed to process webhook",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 }
    );
  }
}
