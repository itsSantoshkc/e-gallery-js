"use client";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useRef } from "react";
import { toast } from "sonner";

const LogInForm = (props) => {
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);

  const router = useRouter();

  // const handleGoogle = async () => {
  //   try {
  //     const data = await signIn("google");
  //     console.log(data);
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      email: EmailRef.current?.value,
      password: PasswordRef.current?.value,
    });
    if (response?.error !== null) {
      return response?.error === "Error: Email is not verified"
        ? router.push("/email-verification")
        : toast.error(response?.error);
    }

    router.push("/");
  };
  return (
    <div className="flex flex-col w-full py-5 mx-4  sm:w-3/4 sm:px-5 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl bg-stone-200">
      <h1 className="w-full py-3 mt-4 text-3xl font-bold text-center">
        Log In
      </h1>
      <div className="py-2 ">
        <h2 className="font-semibold text-center text-stone-600">
          Enter your email and password to log in.
        </h2>
        {/* <h2 className="font-semibold text-center text-stone-600">or</h2> */}
      </div>
      {/* <div className="w-full text-lg font-semibold    *:p-3 *:md:p-3">
        <div
          onClick={handleGoogle}
          className="m-2 transition-colors duration-500 cursor-pointer  rounded-xl bg-stone-300 hover:bg-stone-100"
        >
          <span className="px-2">Log In With Google</span>
        </div>
      </div> */}
      <div className="flex items-center justify-center w-full my-3">
        <Separator className="bg-stone-400 w-[90%]  " />
      </div>
      <div className="mx-2">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="px-3 my-1 font-bold text-stone-600">
            Email Address
          </label>
          <input
            ref={EmailRef}
            type="email"
            name="email"
            className="h-12 px-3 rounded-xl"
            placeholder="Enter Your Password"
          />
          <label
            htmlFor="password"
            className="px-3 my-1 font-bold text-stone-600"
          >
            Password
          </label>
          <div className="relative flex items-center w-full h-12 rounded-xl">
            <input
              ref={PasswordRef}
              type="password"
              name="password"
              className="w-full h-full px-3 rounded-xl"
              placeholder="Enter Your Password"
            />
            <span className="absolute right-5">%</span>
          </div>
          <div className="flex items-center justify-between m-2 mx-1 text-sm font-bold text-stone-600">
            <Link href={"/Sign-up"}>
              <h2 className="transition-colors duration-500 cursor-pointer  hover:text-stone-400">
                Create a new account
              </h2>
            </Link>
            <h2 className="underline transition-colors duration-500 cursor-pointer  hover:text-stone-400">
              Forgot Password ?
            </h2>
          </div>
          <input
            type="submit"
            value="Log In"
            className="p-3 my-3 text-xl font-bold text-white transition-colors duration-500 cursor-pointer rounded-xl bg-stone-500 hover:bg-stone-400 "
          />
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
