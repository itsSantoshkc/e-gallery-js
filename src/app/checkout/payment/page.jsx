"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const index = () => {
  const [status, setStatus] = useState(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    fetch(`${process.env.NEXT_PUBLIC_URL}/api/stripe?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      });
  }, []);

  return (
    <div class="flex items-center justify-center w-full h-[95vh] animate-pulse">
      <div class="bg-gray-200 lg:w-3/5 rounded-2xl lg:h-3/5">
        <div class="p-4 h-6"></div>
        <div class="flex items-center justify-center w-full h-3/5">
          <div class="rounded-full bg-gray-400 w-24 h-24"></div>
        </div>
        <div class="flex flex-col items-center w-full lg:h-2/5 ">
          <div class="my-2 h-6 w-3/4 bg-gray-400"></div>
          <div class="w-3/4 my-2 h-20 bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default index;
