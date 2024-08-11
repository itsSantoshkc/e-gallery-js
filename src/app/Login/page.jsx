import React from "react";
import LogInForm from "./LogInForm";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";

const page = async (props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center w-screen h-full overflow-y-hidden">
      <LogInForm />
    </div>
  );
};

export default page;
