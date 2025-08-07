"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/common/ui/Button";
import { Mail } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password", // Redirect after reset
      });

      if (error) throw error;
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          "Failed to send reset email: " + (err.message || "Unknown error")
        );
      } else {
        setError("Failed to send reset email: Unknown error");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="your@email.com"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <Mail className="w-5 h-5 mr-2" />
          Send Reset Email
        </Button>
      </form>
    </div>
  );
}
