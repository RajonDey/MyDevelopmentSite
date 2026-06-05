"use client";

import { useEffect } from "react";
import Link from "next/link";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#faf9f7",
          color: "#1a1a1a",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div style={{ maxWidth: "28rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>
              RDX Technologies
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: 1.6, color: "#555" }}>
              Something went wrong loading this page. Please try again.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "1.5rem",
                marginRight: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                background: "#1a1a1a",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginTop: "1.5rem",
                padding: "0.5rem 1rem",
                color: "#1a1a1a",
              }}
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
