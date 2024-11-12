import Link from "next/link";
import React from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const Page = () => {
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
          <h1 className="my-2 text-3xl font-bold">Failed to place an order!</h1>
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
};

export default Page;
