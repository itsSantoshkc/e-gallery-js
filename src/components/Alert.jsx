"use client";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function AlertDestructive() {
  const { status } = useSession();
  const pathname = usePathname();
  const authenticationPath = [
    "/Login",
    "/Sign-up",
    "/email-verification",
    "/user-details",
  ];

  if (authenticationPath.includes(pathname)) {
    return;
  }
  if (status === "loading") return;
  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center w-full">
        <Alert variant="destructive" className="my-20 w-[90%] space-x-5">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please log in to operate the website.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}
