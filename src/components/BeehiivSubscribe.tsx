"use client";

export default function BeehiivSubscribe() {
  return (
    <div className="beehiiv-subscribe mt-8">
      <h3 className="text-xl font-semibold mb-4">
        Subscribe to Developer Data
      </h3>
      <p className="text-gray-600 mb-4">
        Get the latest insights on developer trends and data straight to your
        inbox.
      </p>
      <iframe
        src="https://embeds.beehiiv.com/664364ea-a049-49b3-82c0-b52fa54eaf2f?slim=true"
        data-test-id="beehiiv-embed"
        height="52"
        frameBorder="0"
        scrolling="no"
        style={{
          margin: 0,
          borderRadius: "0px",
          backgroundColor: "transparent",
          width: "100%",
          minHeight: "52px",
        }}
      />
    </div>
  );
}
