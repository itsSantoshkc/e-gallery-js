// import Link from "next/link";
// import React from "react";
// import { AiFillPlusCircle } from "react-icons/ai";

// import SideTab from "./SideTab";
// import MainTab from "./MainTab";
// import { IoAddCircle, IoAddOutline } from "react-icons/io5";

// const page = () => {
//   return (
//     <div className="h-full pt-[5vh] w-full   justify-center  flex items-center">
//       <div className="w-[75%] h-full rounded-xl relative  flex justify-center items-center">
//         <SideTab />
//         <MainTab />
//         <Link href={"/admin/new-product"}>
//           <div className="absolute p-2 bg-green-400 rounded-full shadow-xl right-10 bottom-10 animate-bounce">
//             <IoAddOutline className="text-6xl text-white rounded-full cursor-pointer " />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import BarChart from "./Barchart";
import { AiOutlineStock } from "react-icons/ai";
import RecentOrders from "./RecentOrders";
import { FaRegEdit } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

// export const metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// };

export default function DashboardPage() {
  return (
    <div className="relative flex items-center justify-center w-full h-full my-10 border border-red-400 ">
      <div className="grid min-h-screen gap-2 border min-w-screen rounded-xl md:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col items-center justify-center w-full col-span-1 bg-black rounded-xl">
          <div className="w-full px-4 my-2 text-xl font-semibold text-center text-white">
            Categories Market Share
          </div>
          <DoughnutChart className="p-5" />
        </div>
        <div className="flex flex-col items-center justify-center col-span-1 text-white bg-black h-72 md:w-full md:h-full rounded-xl">
          <h1 className="text-5xl font-bold">Total Sales</h1>
          <h2 className="mt-4 text-xl font-semibold">3000 Items Sold</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-full col-span-1 text-white bg-black md:h-full h-72 rounded-xl">
          <h1 className="text-5xl font-bold">Total Revenue</h1>
          <h2 className="flex items-center mt-4 text-xl font-semibold">
            $99990.00
            <AiOutlineStock className="ml-2 text-3xl text-green-500" />
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full col-span-1 text-white bg-black rounded-xl">
          <div className="w-full px-4 my-2 text-xl font-semibold text-center text-white h-1/4">
            Categories sold
          </div>
          <BarChart />
        </div>
        <div className="w-full h-full bg-black rounded-xl md:col-span-2">
          <div className="w-full px-4 pt-4 my-2 text-xl font-semibold text-center text-white">
            Monthly Sales
          </div>
          <LineChart />
        </div>
        <div className="flex flex-col w-full h-full text-white bg-black rounded-xl md:col-span-2">
          <div className="p-4 text-xl flex justify-between px-7 items-center font-semibold h-[12%]">
            Recent Orders
            <Link href={"/admin/recentorders"}>
              <span className="p-2 border cursor-pointer rounded-xl">
                View more
              </span>
            </Link>
          </div>
          <div className="h-[88%] pt-4  ">
            <RecentOrders />
          </div>
        </div>
      </div>
      <Link href={"/admin/manage-products"}>
        <div className="absolute p-2 transition-all duration-300 bg-red-400 rounded-full shadow-xl right-16 bottom-28 hover:bottom-[6.75rem]">
          <MdModeEdit className="p-2 text-6xl text-white rounded-full cursor-pointer " />
        </div>
      </Link>
      <Link href={"/admin/new-product"}>
        <div className="absolute p-2 transition-all duration-300 bg-green-400 rounded-full shadow-xl right-16 bottom-5 hover:bottom-4">
          <IoAddOutline className="text-6xl text-white rounded-full cursor-pointer " />
        </div>
      </Link>
    </div>
  );
}
