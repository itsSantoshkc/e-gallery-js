import React from "react";
import LogInForm from "./LogInForm";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";

const Page = async (props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center w-screen h-[95vh] overflow-hidden">
      <LogInForm />
    </div>
  );
};

export default Page;
