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
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserProduct from "./UserProduct";

export default function DashboardPage() {
  const [recentOrders, setRecentOrders] = useState([]);
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const getUserRecentOrders = async () => {
    if (userId) {
      const response = await fetch(`http://localhost:3000/api/admin/order`, {
        method: "post",
        body: JSON.stringify({
          user_Id: userId,
        }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        setRecentOrders(responseData.data);
      }
    }
  };
  let total = 0;

  for (let i = 0; i < recentOrders.length; i++) {
    total += recentOrders[i].orderedQuantity * recentOrders[i].unitPrice;
  }

  useEffect(() => {
    getUserRecentOrders();
  }, [userId]);
  return (
    <div className="relative flex items-center justify-center h-[90vh]  my-10 border  ">
      <div className="grid min-h-[75vh] gap-2 border max-w-[75vw] min-w-[75vw] rounded-xl md:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col items-center justify-center col-span-2 text-white bg-black h-72 md:w-full md:h-full rounded-xl">
          <h1 className="text-5xl font-bold">Total Sales</h1>
          <h2 className="mt-4 text-xl font-semibold">
            {recentOrders.length} Items Sold
          </h2>
        </div>
        <div className="flex min-h-[30vh] flex-col items-center justify-center w-full col-span-2 text-white bg-black md:h-full h-72 rounded-xl">
          <h1 className="text-5xl font-bold">Total Revenue</h1>
          <h2 className="flex items-center mt-4 text-xl font-semibold">
            Rs. {total}
            <AiOutlineStock className="ml-2 text-3xl text-green-500" />
          </h2>
        </div>

        <div className="flex flex-col w-full h-full border border-slate-600 rounded-xl md:col-span-2">
          <div className="p-4 text-xl flex justify-between px-7 items-center font-semibold h-[12%]">
            Your Poducts
            <Link href={"/admin/manage-products"}>
              <span className="p-2 border cursor-pointer rounded-xl">
                View more
              </span>
            </Link>
          </div>
          <div className="max-h-[45vh] pt-4 bg-white text-black  ">
            <UserProduct />
          </div>
        </div>
        <div className="flex flex-col w-full h-full border border-slate-600 rounded-xl md:col-span-2">
          <div className="p-4 text-xl flex justify-between px-7 items-center font-semibold h-[12%]">
            Recent Orders
            <Link href={"/admin/recentorders"}>
              <span className="p-2 border cursor-pointer rounded-xl">
                View more
              </span>
            </Link>
          </div>
          <div className="max-h-[45vh] pt-4 bg-white text-black  ">
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
