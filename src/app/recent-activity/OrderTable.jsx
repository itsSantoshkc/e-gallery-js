import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";
import { IoMdEye } from "react-icons/io";

const OrderTable = (props) => {
  const date = new Date(props.orderedAt).toDateString();
  return (
    <TableRow
      className="text-center text-[11px] cursor-pointer hover:bg-stone-200 bg-stone-300 md:text-base"
      key={props.id}
    >
      <TableCell className="font-medium md:text-left ">
        {props.id.slice(0, 10) + ". . ."}
      </TableCell>
      <TableCell>{props.paymentStatus}</TableCell>
      <TableCell>{date.toString()}</TableCell>
      <TableCell>Rs. {props.totalAmount}</TableCell>
      <TableCell className=" md:text-right">
        <Link href={`/recent-activity/${props.id}`}>
          <span className="font-semibold transition-all duration-300 cursor-pointer hover:underline">
            View Order
          </span>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default OrderTable;
