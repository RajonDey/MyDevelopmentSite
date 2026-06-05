import { buildLlmsTxt } from "@/content/rdx/seo";

export async function GET() {
  const body = buildLlmsTxt(false);

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
