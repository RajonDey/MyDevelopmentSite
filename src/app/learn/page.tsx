import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Learning Resources | Rajon Dey",
  description: "Redirecting to combined Blog & Learning resources.",
};

export default function LearnPage() {
  // Redirect to the JavaScript learning page as default
  redirect("/learn/javascript");
}
