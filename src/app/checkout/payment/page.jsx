"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";

const index = () => {
  const [stripestatus, setStripeStatus] = useState(null);
  const { data: session, status } = useSession();

  if (session !== undefined) {
    var userId = session.user.id;
  }

  const searchParams = useSearchParams();
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (session !== undefined) {
      fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/stripe?session_id=${sessionId}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setStripeStatus(data.status);
        });
    }
  }, [status]);

  if (stripestatus === "complete") {
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
  }
  if (status === "open") {
    return (
      <div className="flex items-center justify-center w-full h-[95vh]">
        <div className="bg-gray-200 lg:w-3/5 rounded-2xl lg:h-3/4">
          <div className="p-4 ">
            <Link
              href={"/checkout"}
              className="flex items-center w-1/6 font-semibold group"
            >
              <IoIosArrowBack className="mx-1 transition-colors duration-300 cursor-pointer group-hover:text-indigo-500" />
              <h1 className="mx-1 transition-colors duration-300 cursor-pointer group-hover:text-indigo-500">
                Back To Checkout
              </h1>
            </Link>
          </div>
          <div className="flex items-center justify-center w-full h-3/5">
            <FaCircleXmark className="text-red-400 drop-shadow-xl lg:w-72 lg:h-72" />
          </div>
          <div className="flex flex-col items-center w-full lg:h-2/5 ">
            <h1 className="my-2 text-3xl font-bold">
              Failed to place an order!
            </h1>
            <p className="w-3/4 my-2 text-xl text-center">
              The order you have been placed has failed to place successfully
              <br />
              Please! Try again later
              <br />
              Thank You!
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-full h-[95vh] animate-pulse">
      <div className="bg-gray-200 lg:w-3/5 rounded-2xl lg:h-3/5">
        <div className="h-6 p-4"></div>
        <div className="flex items-center justify-center w-full h-3/5">
          <div className="w-24 h-24 bg-gray-400 rounded-full"></div>
        </div>
        <div className="flex flex-col items-center w-full lg:h-2/5 ">
          <div className="w-3/4 h-6 my-2 bg-gray-400"></div>
          <div className="w-3/4 h-20 my-2 bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default index;
