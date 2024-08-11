"use client";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import React, { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const page = (props) => {
  const router = useRouter();
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const FirstNameRef = useRef(null);
  const LastNameRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (PasswordRef.current?.value !== ConfirmPasswordRef.current?.value) {
      return toast.error("Password Doesn't match");
    }
    const formData = {
      email: EmailRef.current?.value,
      password: PasswordRef.current?.value,
      firstName: FirstNameRef.current.value,
      lastName: LastNameRef.current.value,
    };

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (response.status === 401) {
      return toast.error(responseData.message);
    }

    if (response.status === 400) {
      toast.success(responseData.message);
    }

    const signInResponse = await signIn("credentials", {
      email: EmailRef.current?.value,
      password: PasswordRef.current?.value,
      redirect: false,
    });
    if (signInResponse?.error !== null) {
      toast.error(signInResponse?.error);
    }

    return router.push("/email-verification");
  };

  // const handleGoogle = async () => {
  //   try {
  //     const data = await signIn("google", {
  //       redirect: false,
  //       callbackUrl: "/user-details",
  //     });
  //     return router.push(data?.url as string);
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // };

  return (
    <div className="flex items-center justify-center w-screen h-full overflow-y-hidden">
      <div className="flex flex-col w-full py-5 mx-4 sm:w-3/4 sm:px-5 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl bg-stone-200">
        <h1 className="w-full py-3 mt-4 text-3xl font-bold text-center">
          Sign Up
        </h1>
        <div className="py-2 ">
          <h2 className="font-semibold text-center text-stone-600">
            Enter your email and password to Sign Up
          </h2>
          <h2 className="font-semibold text-center text-stone-600">Or</h2>
        </div>
        {/* <div className="w-full text-lg font-semibold    *:p-3 *:md:p-3">
          <div
            onClick={handleGoogle}
            className="m-2 transition-colors duration-500 border cursor-pointer rounded-xl bg-stone-300 hover:bg-stone-100"
          >
            <span className="px-2 ">Sign In With Google</span>
          </div>
        </div> */}

        <div className="flex items-center justify-center w-full my-3">
          <Separator className="bg-stone-400 w-[90%]  " />
        </div>
        <div className="mx-2">
          <form className="flex flex-col " onSubmit={handleSubmit}>
            <label
              htmlFor="fname"
              className="px-3 my-1 font-bold text-stone-600"
            >
              First Name
            </label>
            <input
              ref={FirstNameRef}
              type="text"
              name="fname"
              className="h-12 px-3 rounded-xl"
              placeholder="Enter Your First Name"
            />
            <label
              htmlFor="lname"
              className="px-3 my-1 font-bold text-stone-600"
            >
              Last Name
            </label>
            <input
              ref={LastNameRef}
              type="text"
              name="lname"
              className="h-12 px-3 rounded-xl"
              placeholder="Enter Your Last Name"
            />
            <label
              htmlFor="email"
              className="px-3 my-1 font-bold text-stone-600"
            >
              Email Address
            </label>
            <input
              ref={EmailRef}
              type="email"
              name="email"
              className="h-12 px-3 rounded-xl"
              placeholder="Enter Your Email"
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
              {/* <span className="absolute right-5">%</span> */}
            </div>
            <label
              htmlFor="ConfirmYourPassword"
              className="px-3 my-1 font-bold text-stone-600"
            >
              Confirm Your Password
            </label>
            <div className="relative flex items-center w-full h-12 rounded-xl">
              <input
                ref={ConfirmPasswordRef}
                type="password"
                name="ConfirmYourPassword"
                className="w-full h-full px-3 rounded-xl"
                placeholder="Confirm Your Password"
              />
              {/* <span className="absolute right-5">%</span> */}
            </div>
            <div className="flex mx-1 m-2 pt-3 items-center  *:px-2 text-sm font-bold text-stone-600">
              <h2 className="transition-colors duration-500 cursor-pointer hover:text-stone-400">
                Already Have a account?
              </h2>
            </div>
            <input
              type="submit"
              value="Log In"
              className="p-3 my-6 text-xl font-bold text-white transition-colors duration-500 cursor-pointer rounded-xl bg-stone-500 hover:bg-stone-400 "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
