"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const PaymentResult = () => {
  const [stripeStatus, setStripeStatus] = useState(null);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data: session } = useSession();

  useEffect(() => {
    const fetchStatus = async () => {
      if (!sessionId) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/stripe?session_id=${sessionId}`,
      );

      const data = await res.json();
      setStripeStatus(data.status);
    };

    fetchStatus();
  }, [sessionId]);

  if (!stripeStatus) return <div>Loading...</div>;

  return <div>{stripeStatus === "complete" ? "Success" : "Failed"}</div>;
};

export default PaymentResult;
