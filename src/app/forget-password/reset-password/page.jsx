"use client";
import React, { useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";
import { toast } from "sonner";

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);
  const retypePasswordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = searchParams.get("Id");

      if (!id) {
        toast.error("Invalid or expired reset link");
        return;
      }

      const password = passwordRef.current?.value?.trim();
      const confirmPassword = retypePasswordRef.current?.value?.trim();

      if (!password || !confirmPassword) {
        toast.error("Password fields cannot be empty");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/user/password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Id: id, password }),
        },
      );

      if (response.status === 401) {
        toast.error("The reset link has expired");
        return;
      }

      if (response.ok) {
        toast.success("Password changed successfully");
        router.push("/Login");
        return;
      }

      toast.error("Failed to reset password. Try again later");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-[90vh] overflow-y-hidden">
      <div className="flex flex-col w-full py-5 mx-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl bg-stone-200">
        <h1 className="w-full py-3 mt-4 text-3xl font-bold text-center">
          Reset Password
        </h1>

        <div className="py-2">
          <h2 className="font-semibold text-center text-stone-600">
            Enter your new password
          </h2>

          <form className="flex flex-col mx-2" onSubmit={handleSubmit}>
            <label className="px-3 my-2 font-bold text-stone-600">
              New password
            </label>

            <PasswordInput
              ref={passwordRef}
              placeholder="Enter your new password"
              name="password"
            />

            <label className="px-3 my-2 font-bold text-stone-600">
              Confirm password
            </label>

            <PasswordInput
              ref={retypePasswordRef}
              placeholder="Re-enter your password"
              name="confirm-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center p-3 my-3 text-xl font-bold text-white rounded-xl bg-stone-500 hover:bg-stone-400 disabled:opacity-60"
            >
              {!loading ? (
                "Change Password"
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="w-screen h-[90vh]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default Page;
