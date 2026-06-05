"use client";

import { useState } from "react";
import { Button } from "@/components/common/ui/Button";
import { services } from "@/data/mock-data";

interface PayoneerPaymentProps {
  service: (typeof services)[0];
}

export default function PayoneerPayment({ service }: PayoneerPaymentProps) {
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace with your actual Payoneer email
  const payoneerEmail = "rajondeyofficial@gmail.com"; // Update this!

  const handleFixedPayment = () => {
    setLoading(true);
    const fixedUrl = `https://www.payoneer.com/request-payment/?email=${encodeURIComponent(
      payoneerEmail
    )}&amount=${service.price}&description=${encodeURIComponent(
      `Payment for ${service.title}`
    )}`;
    window.location.href = fixedUrl;
    setLoading(false);
  };

  const handleCustomPayment = () => {
    if (
      !customAmount ||
      isNaN(Number(customAmount)) ||
      Number(customAmount) <= 0
    ) {
      alert("Please enter a valid amount");
      return;
    }
    setLoading(true);
    const customUrl = `https://www.payoneer.com/request-payment/?email=${encodeURIComponent(
      payoneerEmail
    )}&amount=${customAmount}&description=${encodeURIComponent(
      `Custom Payment for ${service.title}`
    )}`;
    window.location.href = customUrl;
    setLoading(false);
  };

  return (
    <>
      <div className="mb-4">
        <p className="text-gray-600 text-sm">Starting at</p>
        <p className="text-2xl font-bold text-gray-800">${service.price}</p>
      </div>
      <Button
        onClick={handleFixedPayment}
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white mb-4"
      >
        {loading ? "Processing..." : `Continue ($${service.price})`}
      </Button>

      <div className="mb-4">
        <p className="text-gray-600 text-sm mb-2">Or enter a custom amount</p>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Enter amount in USD"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          min="1"
        />
      </div>
      <Button
        onClick={handleCustomPayment}
        disabled={loading || !customAmount}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4"
      >
        {loading ? "Processing..." : "Pay Custom Amount"}
      </Button>

      <a href="/order" rel="noopener noreferrer">
        <Button variant="outline" className="w-full">
          Order Now
        </Button>
      </a>

      {/* Placeholder for future payment methods */}
      {/* <Button onClick={handleSSLCommerzPayment}>Pay with SSLCommerz (Coming Soon)</Button> */}
    </>
  );
}
