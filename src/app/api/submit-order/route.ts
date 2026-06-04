import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Legacy order checkout is disabled. Use /start for RDX project inquiries.",
    },
    { status: 410 }
  );
}
