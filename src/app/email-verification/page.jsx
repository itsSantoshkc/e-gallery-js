"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "sonner";

const page = (props) => {
  const router = useRouter();
  const OtpRef = useRef(null);
  const { data: session } = useSession();
  const handleSubmit = async () => {
    if (OtpRef.current === null) {
      return;
    }
    if (
      parseInt(OtpRef.current?.value) <= 100000 ||
      OtpRef.current?.value === ""
    ) {
      return toast.error("Please! Make sure your code is correct");
    }

    if (session === null) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/auth/email-verification`,
      {
        method: "post",
        body: JSON.stringify({
          id: session?.user.id,
          verificationToken: OtpRef.current?.value,
        }),
      }
    );
    const responseData = await response.json();
    if (response.status === 401) {
      return toast.error(responseData.message);
    }
    toast.success(responseData.message);
    return router.push("/user-details");
  };
  return (
    <div className="flex items-center justify-center w-screen h-full overflow-y-hidden">
      <div className="flex flex-col items-center w-full py-5 mx-4 h-4/6 md:h-1/2 sm:w-3/4 sm:px-5 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 rounded-xl bg-stone-200">
        <h1 className="w-full py-3 mt-4 text-3xl font-bold text-center">
          Security Login
        </h1>
        <div className="py-2 ">
          <h2 className="font-semibold text-center text-stone-600">
            Enter a 6-digit login code sent to your email
          </h2>
        </div>

        <div className="flex items-center justify-center w-full mt-3">
          <Separator className="bg-stone-400 w-[90%]  " />
        </div>
        <div className="flex flex-col h-full mx-2 mt-5 ">
          <div className="flex items-center justify-center h-full ">
            <InputOTP maxLength={6} ref={OtpRef}>
              <InputOTPGroup className="*:border *:md:text-3xl *:text-2xl *:p-6 *:md:p-7  *:border-stone-400">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="*:border *:md:text-3xl *:text-2xl *:p-6 *:md:p-7 *:border-stone-400">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            onClick={handleSubmit}
            className="p-3 text-xl font-bold text-white transition-colors duration-500 cursor-pointer py-7 rounded-xl bg-stone-500 hover:bg-stone-400 "
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
