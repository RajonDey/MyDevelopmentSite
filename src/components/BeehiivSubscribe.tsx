"use client";

export default function BeehiivSubscribe() {
  return (
    <section className="beehiiv-subscribe mt-12 bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Subscribe to Developer Data
          </h3>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Stay ahead with the latest insights on developer trends, tools, and
            data—delivered straight to your inbox.
          </p>
          <div className="w-full max-w-md mx-auto">
            <iframe
              src="https://embeds.beehiiv.com/664364ea-a049-49b3-82c0-b52fa54eaf2f?slim=true"
              data-test-id="beehiiv-embed"
              height="52"
              frameBorder="0"
              scrolling="no"
              style={{
                margin: 0,
                borderRadius: "8px",
                backgroundColor: "transparent",
                width: "100%",
                minHeight: "52px",
              }}
              className="shadow-sm"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No spam, just valuable content. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
