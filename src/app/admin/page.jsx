"use client";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";
import DoughnutChart from "./DoughnutChart";
import LineChart, { Last12MonthsChart, Last6MonthsChart } from "./LineChart";
import { AiOutlineStock } from "react-icons/ai";
import RecentOrders from "./RecentOrders";
import { MdModeEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserProduct from "./UserProduct";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Last15DaysChart, Last7DaysChart } from "./LineChart";

export default function DashboardPage() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartValue, setchartValue] = useState("Last 7 Days");
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const getUserRecentOrders = async () => {
    if (userId) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/admin/order`,
        {
          method: "post",
          body: JSON.stringify({
            user_Id: userId,
          }),
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setRecentOrders(responseData.data);
      }
    }
  };
  let totalRevenue = 0;
  let totalSales = 0;

  for (let i = 0; i < recentOrders.length; i++) {
    totalRevenue += recentOrders[i].orderedQuantity * recentOrders[i].unitPrice;
    totalSales += recentOrders[i].orderedQuantity;
  }

  const handleSelectChange = (data) => {
    // console.log(data);
    setchartValue(data);
  };
  useEffect(() => {
    getUserRecentOrders();
  }, [userId]);

  if (session === undefined || status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="loader "></div>
      </div>
    );
  }
  return (
    <div className="relative flex items-center justify-center h-[90vh] mt-[10vh] my-10   ">
      <div className="grid min-h-[75vh] gap-2  max-w-[75vw] min-w-[75vw]  rounded-xl md:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col items-center justify-center col-span-4 text-white bg-black md:col-span-1 h-72 md:w-full md:h-full rounded-xl">
          <h1 className="text-4xl font-bold">All Time Sales</h1>
          <h2 className="mt-4 text-2xl font-semibold">
            {totalSales} Items Sold
          </h2>
        </div>
        <div className="flex min-h-[30vh] flex-col items-center justify-center w-full  col-span-4 md:col-span-1 text-white bg-black md:h-full h-72 rounded-xl">
          <h1 className="text-4xl font-bold">All Time Revenue</h1>
          <h2 className="flex items-center mt-4 text-2xl font-semibold text-green-500">
            Rs. {totalRevenue}
            <AiOutlineStock className="ml-2 text-3xl text-green-500" />
          </h2>
        </div>

        <div className="flex flex-col w-full h-full col-span-4 border border-slate-600 rounded-xl md:col-span-2">
          <div className="flex items-center justify-end w-full px-4 py-2">
            <Select
              onValueChange={handleSelectChange}
              defaultValue={chartValue}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Last 7 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select date</SelectLabel>
                  <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                  <SelectItem value="Last 15 Days">Last 15 Days</SelectItem>
                  <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                  <SelectItem value="Last 12 Months">Last 12 Months</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {chartValue === "Last 7 Days" && (
            <Last7DaysChart className="p-4" orderData={recentOrders} />
          )}
          {chartValue === "Last 15 Days" && (
            <Last15DaysChart className="p-4" orderData={recentOrders} />
          )}
          {chartValue === "Last 6 Months" && (
            <Last6MonthsChart className="p-4" orderData={recentOrders} />
          )}
          {chartValue === "Last 12 Months" && (
            <Last12MonthsChart className="p-4" orderData={recentOrders} />
          )}
        </div>
        <div className="flex flex-col w-full h-full col-span-4 border border-slate-600 rounded-xl md:col-span-2">
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
        <div className="flex flex-col w-full h-full col-span-4 border border-slate-600 rounded-xl md:col-span-2">
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
