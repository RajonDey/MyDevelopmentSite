// pages/api/reviews.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, rating, comment, serviceId } = req.body;

    // Validate the input
    if (!name || !rating || !comment || !serviceId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save the review to your database or WordPress
    try {
      // Example: Save the review to WordPress using the REST API
      const wordpressResponse = await fetch(
        "https://development-admin.rajondey.com/wp-json/wp/v2/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_WORDPRESS_AUTH_TOKEN", // Add authentication if needed
          },
          body: JSON.stringify({
            title: name,
            content: comment,
            status: "publish", // Publish the review
            meta: {
              rating,
              service_id: serviceId,
            },
          }),
        }
      );

      if (!wordpressResponse.ok) {
        throw new Error("Failed to submit review to WordPress");
      }

      const data = await wordpressResponse.json();
      res.status(201).json({ message: "Review submitted successfully!", data });
    } catch (error) {
      console.error("Error submitting review:", error);
      res.status(500).json({ message: "Failed to submit review" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
