"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/common/ui/Button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session?.user?.name || "Client"}
      </h1>
      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Sign Out
      </Button>
    </div>
  );
}
