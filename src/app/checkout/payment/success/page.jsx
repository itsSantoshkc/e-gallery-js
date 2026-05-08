"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, Suspense } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

// ✅ Split into inner component that uses useSearchParams
const PaymentSuccessContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = searchParams.get("data");

  const paymentInfo = useMemo(() => {
    try {
      if (!data) return null;
      return JSON.parse(atob(data));
    } catch (err) {
      return null;
    }
  }, [data]);

  const userId = session?.user?.id;

  useEffect(() => {
    const handleCompleteOrder = async () => {
      if (!paymentInfo || !userId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/order`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              transaction_id: paymentInfo.transaction_uuid,
            }),
          },
        );

        if (response.ok) {
          router.push("/");
        }
      } catch (err) {
        console.error("Order failed:", err);
      }
    };

    if (status === "authenticated") {
      handleCompleteOrder();
    }
  }, [status, paymentInfo, userId, router]);

  if (status === "loading") {
    return <div className="w-full h-full overflow-hidden" />;
  }

  return (
    <div className="flex items-center justify-center w-full h-[95vh]">
      <div className="bg-gray-200 lg:w-3/5 rounded-2xl lg:h-3/4">
        <div className="p-4">
          <Link
            href="/"
            className="flex items-center w-1/6 font-semibold group"
          >
            <IoIosArrowBack className="mx-1 group-hover:text-indigo-500" />
            Back To Home
          </Link>
        </div>

        <div className="flex items-center justify-center w-full h-3/5">
          <FaCircleCheck className="text-green-400 lg:w-72 lg:h-72" />
        </div>

        <div className="flex flex-col items-center w-full lg:h-2/5">
          <h1 className="my-2 text-3xl font-bold">
            Order placed successfully!
          </h1>
          <p className="w-3/4 my-2 text-xl text-center">
            Thank you for your order
          </p>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="w-full h-full overflow-hidden" />}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default Page;
