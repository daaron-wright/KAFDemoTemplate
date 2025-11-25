"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    console.log("LoginPage mounted, redirecting to /prompt");
    // Set the agent ID directly in localStorage to the one created by make agent-create
    if (typeof window !== "undefined") {
        localStorage.setItem(
            "letta_agent_id",
            "agent-fa8319a7-ce81-440b-aeb9-b91f46e6967c"
        );
    }

    // Redirect to prompt page immediately
    router.push("/prompt");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#0a1622]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
        <p className="text-cyan-400 text-sm">Loading Kyndryl Agentic Framework...</p>
        <Link href="/prompt" className="text-xs text-gray-400 hover:text-white underline mt-4">
          Click here if not redirected automatically
        </Link>
      </div>
    </div>
  );
}
