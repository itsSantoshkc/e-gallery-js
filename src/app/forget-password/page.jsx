"use client";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const EmailRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/user/password-reset?email=${EmailRef.current.value}`,
      {
        method: "get",
      }
    );
    if (response.status === 200) {
      toast.info(`Check you email to reset password`);
      return setLoading(false);
    }
    toast.error(`Unable to reset password. Please! Try again later`);
    return setLoading(false);
  };
  return (
    <div className="flex items-center justify-center w-screen h-[90vh] overflow-y-hidden">
      <div className="flex flex-col w-full py-5 mx-4 sm:w-3/4 sm:px-5 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl bg-stone-200">
        <h1 className="w-full py-3 mt-4 text-3xl font-bold text-center">
          Reset Password
        </h1>
        <div className="py-2 ">
          <h2 className="font-semibold text-center text-stone-600">
            Enter your email to reset your password.
          </h2>
          <div className="mx-2">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="px-3 my-2 font-bold text-stone-600"
              >
                Email Address
              </label>
              <input
                ref={EmailRef}
                type="email"
                name="email"
                className="h-12 px-3 rounded-xl"
                placeholder="Enter Your email"
              />
              <button
                type="submit"
                value="Reset Password"
                disabled={loading ? true : false}
                className="flex items-center justify-center p-3 my-3 text-xl font-bold text-white transition-colors duration-500 cursor-pointer rounded-xl bg-stone-500 hover:bg-stone-400 "
              >
                {!loading && "Reset Password"}
                {loading && (
                  <div className="flex items-center px-2 justify-evenly">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600" />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
