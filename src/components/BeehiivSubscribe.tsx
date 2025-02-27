"use client";

import { useEffect } from "react";

export default function BeehiivSubscribe() {
  useEffect(() => {
    // Load Beehiiv script dynamically if needed
    const script = document.createElement("script");
    script.src = "https://embeds.beehiiv.com/YOUR_SCRIPT_ID.js"; // Replace with your Beehiiv script URL
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="beehiiv-subscribe mt-8">
      <h3 className="text-xl font-semibold mb-4">
        Subscribe to Developer Data
      </h3>
      <p className="text-gray-600 mb-4">
        Get the latest insights on developer trends and data straight to your
        inbox.
      </p>
      <div id="beehiiv-embed" /> {/* Placeholder for Beehiiv form */}
    </div>
  );
}
