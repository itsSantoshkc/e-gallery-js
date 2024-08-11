import Link from "next/link";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

import SideTab from "./SideTab";
import MainTab from "./MainTab";
import { IoAddCircle, IoAddOutline } from "react-icons/io5";

const page = () => {
  return (
    <div className="h-full pt-[5vh] w-full   justify-center  flex items-center">
      <div className="w-[75%] h-full rounded-xl relative  flex justify-center items-center">
        <SideTab />
        <MainTab />
        <Link href={"/admin/new-product"}>
          <div className="absolute p-2 bg-green-400 rounded-full shadow-xl right-10 bottom-10 animate-bounce">
            <IoAddOutline className="text-6xl text-white rounded-full cursor-pointer " />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
