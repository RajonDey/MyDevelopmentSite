import { ImageResponse } from "next/og";
import { siteMetadata } from "@/content/rdx/metadata";

export const runtime = "edge";
export const alt = siteMetadata.siteName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf9f7",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: "#6b6560",
              margin: 0,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {siteMetadata.siteName}
          </p>
          <p
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              color: "#1a1816",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {siteMetadata.tagline}
          </p>
          <p
            style={{
              fontSize: 28,
              color: "#6b6560",
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {siteMetadata.priceFloorLabel} · Global remote team
          </p>
        </div>
        <p
          style={{
            fontSize: 24,
            color: "#9a948d",
            margin: 0,
          }}
        >
          development.rajondey.com
        </p>
      </div>
    ),
    { ...size }
  );
}
