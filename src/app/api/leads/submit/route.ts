import { NextResponse } from "next/server";
import { insertLead, validateSubmitLeadInput } from "@/lib/leads";
import { sendLeadEmails } from "@/lib/lead-notifications";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = validateSubmitLeadInput(body);

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    if (supabase) {
      const lead = await insertLead(parsed);
      if (!lead) {
        return NextResponse.json(
          { error: "Failed to save lead" },
          { status: 500 }
        );
      }

      try {
        const emailResult = await sendLeadEmails(parsed);
        return NextResponse.json({
          success: true,
          id: lead.id,
          mode: "db",
          qualified: emailResult.qualified,
        });
      } catch (emailError) {
        console.error("Lead saved but email failed:", emailError);
        return NextResponse.json({
          success: true,
          id: lead.id,
          mode: "db",
          emailWarning: true,
        });
      }
    }

    const emailResult = await sendLeadEmails(parsed);
    if (!emailResult.sent) {
      return NextResponse.json(
        {
          error:
            "Submission is temporarily unavailable. Email contact@rajondey.com directly.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      mode: "email",
      qualified: emailResult.qualified,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
