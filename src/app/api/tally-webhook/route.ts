import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Legacy Tally webhook is disabled. RDX leads now submit through /api/leads/submit.",
    },
    { status: 410 }
  );
}
