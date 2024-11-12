"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const decodedPaymentInfo = atob(data);
  const paymentInfo = JSON.parse(decodedPaymentInfo);
  const userId = session?.user?.id;

  const handleCompleteOrder = async () => {
    if (paymentInfo) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/order`, {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          transaction_id: paymentInfo.transaction_uuid,
        }),
      });
      if (response.status === 200) {
        return router.push("/");
      }
    }
  };

  useEffect(() => {
    handleCompleteOrder();
  }, [status]);
  if (session === undefined || status === "loading") {
    return <div className="w-full h-full overflow-hidden "></div>;
  }

  return (
    <div className="flex items-center justify-center w-full h-[95vh]">
      <div className="bg-gray-200 lg:w-3/5 rounded-2xl lg:h-3/4">
        <div className="p-4 ">
          <Link
            href={"/"}
            className="flex items-center w-1/6 font-semibold group"
          >
            <IoIosArrowBack className="mx-1 transition-colors duration-300 cursor-pointer group-hover:text-indigo-500" />
            <h1 className="mx-1 transition-colors duration-300 cursor-pointer group-hover:text-indigo-500">
              Back To Home
            </h1>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full h-3/5">
          <FaCircleCheck className="text-green-400 drop-shadow-xl lg:w-72 lg:h-72" />
        </div>
        <div className="flex flex-col items-center w-full lg:h-2/5 ">
          <h1 className="my-2 text-3xl font-bold">
            Order has been placed successfully !!!
          </h1>
          <p className="w-3/4 my-2 text-xl text-center">
            Thank You! For placing order
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
