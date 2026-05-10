"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";

const PaymentResultContent = () => {
  const [stripeStatus, setStripeStatus] = useState(null);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data: session } = useSession();

  useEffect(() => {
    const fetchStatus = async () => {
      if (!sessionId) return;

      try {
        const res = await fetch(`/api/stripe?session_id=${sessionId}`);

        const data = await res.json();
        setStripeStatus(data.status);
      } catch (err) {
        setStripeStatus("failed");
      }
    };

    fetchStatus();
  }, [sessionId]);

  if (!stripeStatus) return <div>Loading...</div>;

  return <div>{stripeStatus === "complete" ? "Success" : "Failed"}</div>;
};

const PaymentResult = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultContent />
    </Suspense>
  );
};

export default PaymentResult;
