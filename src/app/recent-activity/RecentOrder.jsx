"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderTable from "./OrderTable";
import { useEffect, useState } from "react";
const RecentOrder = ({ userId }) => {
  const [orderData, setOrderData] = useState([]);
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV008",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV009",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV010",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
  ];
  const getUserRecentOrders = async () => {
    if (userId) {
      const response = await fetch(
        `http://localhost:3000/api/order?uid=${userId}`
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setOrderData(responseData.orders);
      }
    }
  };

  useEffect(() => {
    getUserRecentOrders();
  }, []);

  return (
    <>
      <div className="p-5 py-10 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        <h1>A List Of Your Recent Orders</h1>
      </div>
      <div className="px-3 pb-5 my-8 md:mx-20 md:w-5/6 2xl:w-3/4 lg:mx-auto ">
        <Table className="text-xs sm:text-sm md:text-lg">
          <TableHeader>
            <TableRow className="hover:bg-stone-600  bg-stone-600 *:hover:bg-stone-500 *:cursor-pointer *:text-white *:font-bold">
              <TableHead className="text-center md:text-left">
                Order No
              </TableHead>
              <TableHead className="text-center ">Payment Method</TableHead>
              <TableHead className="text-center ">Ordered At</TableHead>
              <TableHead className="text-center ">Paid </TableHead>
              <TableHead className="text-center md:text-right "></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.length > 0 &&
              orderData !== null &&
              orderData?.map((order) => (
                <OrderTable
                  id={order.id}
                  key={order.id}
                  orderedAt={order.orderedAt}
                  paymentStatus={"paid"}
                  totalAmount={order.orderedTotalAmount}
                />
              ))}
          </TableBody>
          {/* {orderData.length >= 10 ? (
            <TableFooter className="bg-stone-600 ">
              <TableRow className="rounded-b-full hover:bg-stone-600">
                <TableCell colSpan={4}>
                  <div className="flex items-center justify-between *:p-2  *:text-white *:font-bold *:text-center w-1/5">
                    <p className="w-10 p-2 mx-2 border rounded-lg ">11</p>
                    <p className="p-2 text-sms md:text-base">TO</p>
                    <p className="w-10 p-2 mx-2 border rounded-lg">20</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button className="text-sm text-black md:text-lg bg-stone-300 hover:bg-stone-200">
                    Show More
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          ) : (
            ""
          )} */}
        </Table>
      </div>
    </>
  );
};

export default RecentOrder;
